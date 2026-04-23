import crypto from "node:crypto";

export const ALGORITHM = "OneMoney-HMAC-SHA256";

type BuildAuthorizationHeaderInput = {
  accessKey: string;
  secretKey?: string;
  method: string;
  requestPath: string;
  requestBody: Buffer;
  timestamp?: string;
  sandbox: boolean;
};

export const hashBody = (body: Buffer) =>
  crypto.createHash("sha256").update(body).digest("hex");

export const constructStringToSign = (
  accessKey: string,
  timestamp: string,
  httpMethod: string,
  requestPath: string,
  bodyHash: string,
) =>
  [
    accessKey,
    timestamp,
    httpMethod.toUpperCase(),
    requestPath,
    bodyHash,
  ].join("\n");

export const getOmDateTimestamp = (date = new Date()) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return (
    `${date.getUTCFullYear()}` +
    `${pad(date.getUTCMonth() + 1)}` +
    `${pad(date.getUTCDate())}` +
    "T" +
    `${pad(date.getUTCHours())}` +
    `${pad(date.getUTCMinutes())}` +
    `${pad(date.getUTCSeconds())}` +
    "Z"
  );
};

export const calculateSignature = (secretKey: string, stringToSign: string) =>
  crypto
    .createHmac("sha256", Buffer.from(secretKey, "base64url"))
    .update(stringToSign)
    .digest("hex");

export const buildAuthorizationHeader = ({
  accessKey,
  secretKey,
  method,
  requestPath,
  requestBody,
  timestamp = getOmDateTimestamp(),
  sandbox,
}: BuildAuthorizationHeaderInput) => {
  if (!secretKey && sandbox) {
    return `Bearer ${accessKey}`;
  }

  if (!secretKey) {
    throw new Error("Missing secret key for HMAC mode");
  }

  const stringToSign = constructStringToSign(
    accessKey,
    timestamp,
    method,
    requestPath,
    hashBody(requestBody),
  );
  const signature = calculateSignature(secretKey, stringToSign);
  return `${ALGORITHM} ${accessKey}:${timestamp}:${signature}`;
};
