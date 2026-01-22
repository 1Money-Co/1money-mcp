/**
 * Error raised for non-2xx responses from the 1money API.
 */
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
export class ApiError extends Error {
  statusCode: number;
  statusText: string;
  code?: string;
  detail?: string;
  instance?: string;
  requestId?: string;
  rawBody?: string;

  /**
   * @param message - Human-readable summary of the failure.
   * @param options - Structured response metadata for debugging.
   */
  constructor(message: string, options: { statusCode: number; statusText: string; code?: string; detail?: string; instance?: string; requestId?: string; rawBody?: string }) {
    super(message);
    this.name = "ApiError";
    this.statusCode = options.statusCode;
    this.statusText = options.statusText;
    this.code = options.code;
    this.detail = options.detail;
    this.instance = options.instance;
    this.requestId = options.requestId;
    this.rawBody = options.rawBody;
  }
}
