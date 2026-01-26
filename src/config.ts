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
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const DEFAULT_BASE_URL = "https://api.sandbox.1money.com";
const DEFAULT_PROFILE = "default";
const DEFAULT_TIMEOUT_MS = 30000;

/**
 * Runtime configuration for the 1money MCP server and API client.
 */
export type Config = {
  accessKey: string;
  secretKey?: string;
  baseUrl: string;
  sandbox: boolean;
  profile: string;
  timeoutMs: number;
};

type CredentialsProfile = {
  access_key?: string;
  secret_key?: string;
  base_url?: string;
  sandbox?: string;
};

const parseCredentialsFile = (filePath: string): Record<string, CredentialsProfile> => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const contents = fs.readFileSync(filePath, "utf8");
  const lines = contents.split(/\r?\n/);
  const profiles: Record<string, CredentialsProfile> = {};
  let currentProfile = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith(";")) {
      continue;
    }

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      currentProfile = trimmed.slice(1, -1).trim();
      if (!profiles[currentProfile]) {
        profiles[currentProfile] = {};
      }
      continue;
    }

    const [rawKey, ...rest] = trimmed.split("=");
    if (!rawKey || rest.length === 0 || !currentProfile) {
      continue;
    }

    const key = rawKey.trim();
    const value = rest.join("=").trim();
    profiles[currentProfile][key as keyof CredentialsProfile] = value;
  }

  return profiles;
};

/**
 * Loads configuration from environment variables and the credentials file.
 * Throws when required credentials are missing.
 */
export const loadConfig = (): Config => {
  const profile = process.env.ONEMONEY_PROFILE || DEFAULT_PROFILE;
  const credsFile = path.join(os.homedir(), ".onemoney", "credentials");
  const profiles = parseCredentialsFile(credsFile);
  const fileProfile = profiles[profile] || {};

  const accessKey = process.env.ONEMONEY_ACCESS_KEY || fileProfile.access_key || "";
  const secretKey = process.env.ONEMONEY_SECRET_KEY || fileProfile.secret_key;
  const baseUrl = process.env.ONEMONEY_BASE_URL || fileProfile.base_url || DEFAULT_BASE_URL;
  const sandboxEnv = process.env.ONEMONEY_SANDBOX ?? fileProfile.sandbox;
  const sandbox =
    sandboxEnv !== undefined
      ? sandboxEnv === "1" || sandboxEnv === "true"
      : baseUrl === DEFAULT_BASE_URL;
  const timeoutMs = Number(process.env.ONEMONEY_TIMEOUT_MS || DEFAULT_TIMEOUT_MS);

  if (!accessKey) {
    console.error("Warning: Missing ONEMONEY_ACCESS_KEY or credentials file access_key. Tools will fail until configured.");
  }

  return {
    accessKey,
    secretKey,
    baseUrl,
    sandbox,
    profile,
    timeoutMs: Number.isFinite(timeoutMs) ? timeoutMs : DEFAULT_TIMEOUT_MS,
  };
};
