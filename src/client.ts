/*
 * Copyright 2026 1Money Co.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import crypto from "node:crypto";
import os from "node:os";
import { ApiError } from "./errors.js";
import type { Config } from "./config.js";

type RequestOptions = {
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
};

type ErrorBody = {
  code?: string;
  status?: number;
  detail?: string;
  instance?: string;
};

/**
 * Minimal client for authenticated requests to the 1money API.
 */
export class OneMoneyClient {
  private readonly baseUrl: string;
  private readonly accessKey: string;
  private readonly secretKey?: string;
  private readonly sandbox: boolean;
  private readonly timeoutMs: number;
  private readonly userAgent: string;

  constructor(config: Config) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.accessKey = config.accessKey;
    this.secretKey = config.secretKey;
    this.sandbox = config.sandbox;
    this.timeoutMs = config.timeoutMs;
    this.userAgent = `1money-mcp/0.1.0 (Node/${process.version}; ${os.platform()}/${os.arch()})`;
  }

  /**
   * Issues an authenticated GET request.
   */
  async get(path: string, query?: RequestOptions["query"], headers?: RequestOptions["headers"]) {
    return this.request("GET", path, { query, headers });
  }

  /**
   * Issues an authenticated POST request.
   */
  async post(path: string, body?: RequestOptions["body"], headers?: RequestOptions["headers"]) {
    return this.request("POST", path, { body, headers });
  }

  /**
   * Issues an authenticated PUT request.
   */
  async put(path: string, body?: RequestOptions["body"], headers?: RequestOptions["headers"]) {
    return this.request("PUT", path, { body, headers });
  }

  /**
   * Issues an authenticated DELETE request.
   */
  async delete(path: string, query?: RequestOptions["query"], headers?: RequestOptions["headers"]) {
    return this.request("DELETE", path, { query, headers });
  }

  private async request(method: string, path: string, options: RequestOptions) {
    const bodyBytes = options.body ? Buffer.from(JSON.stringify(options.body)) : Buffer.alloc(0);
    const timestamp = this.getTimestamp();
    const authHeader = this.buildAuthHeader(method, path, bodyBytes, timestamp);
    const headers: Record<string, string> = {
      Authorization: authHeader,
      "X-OM-Date": timestamp,
      "User-Agent": this.userAgent,
      ...options.headers,
    };

    if (bodyBytes.length > 0) {
      headers["Content-Type"] = "application/json";
    }

    const queryString = options.query ? buildQueryString(options.query) : "";
    const url = `${this.baseUrl}${path}${queryString}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: bodyBytes.length > 0 ? bodyBytes : undefined,
        signal: controller.signal,
      });

      const text = await response.text();
      const json = text ? safeJsonParse(text) : null;

      if (!response.ok) {
        throw buildApiError(response.status, response.statusText, json, text, response.headers.get("x-request-id") || undefined);
      }

      return json;
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildAuthHeader(method: string, path: string, body: Buffer, timestamp: string) {
    if (this.sandbox) {
      return `Bearer ${this.accessKey}`;
    }

    if (!this.secretKey) {
      throw new Error("Missing secret key for non-sandbox request");
    }

    const bodyHash = crypto.createHash("sha256").update(body).digest("hex");
    const stringToSign = [
      this.accessKey,
      timestamp,
      method.toUpperCase(),
      path,
      bodyHash,
    ].join("\n");

    const keyBytes = decodeSecretKey(this.secretKey);
    const signature = crypto.createHmac("sha256", keyBytes).update(stringToSign).digest("hex");
    return `OneMoney-HMAC-SHA256 ${this.accessKey}:${timestamp}:${signature}`;
  }

  private getTimestamp() {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, "0");
    return (
      `${now.getUTCFullYear()}` +
      `${pad(now.getUTCMonth() + 1)}` +
      `${pad(now.getUTCDate())}` +
      "T" +
      `${pad(now.getUTCHours())}` +
      `${pad(now.getUTCMinutes())}` +
      `${pad(now.getUTCSeconds())}` +
      "Z"
    );
  }
}

const buildApiError = (
  statusCode: number,
  statusText: string,
  parsed: unknown,
  rawBody: string,
  requestId?: string,
) => {
  const errorBody = (parsed || {}) as ErrorBody;
  const message = errorBody.detail || statusText || "Request failed";
  return new ApiError(message, {
    statusCode,
    statusText,
    code: errorBody.code,
    detail: errorBody.detail,
    instance: errorBody.instance,
    requestId,
    rawBody,
  });
};

const safeJsonParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const buildQueryString = (params: Record<string, string | number | boolean | undefined>) => {
  const entries = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${String(value)}`);

  if (entries.length === 0) {
    return "";
  }

  return `?${entries.join("&")}`;
};

const decodeSecretKey = (secretKey: string) => {
  const normalized = secretKey.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(normalized + padding, "base64");
};
