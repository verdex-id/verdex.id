import { nanoid } from "nanoid";
import * as jose from "jose";

const key = jose.base64url.decode(process.env.TOKEN_SYMMETRIC_KEY);

/**
 * Create a JWT token for the given account ID with specified duration.
 * @param {string} accountId - The account ID for whom the token is created.
 * @param {number} duration - The duration of the token validity in hours.
 * @returns {Promise<[string|null, Object|null, string|null]>} A Promise that resolves with an array containing:
 * - The encrypted token string.
 * - The token payload object.
 * - An error message, if any.
 * @example
 * // Usage example:
 * const [encryptedToken, payload, errorMessage] = await createToken("user123", 24);
 * if (errorMessage) {
 *   console.error("Error:", errorMessage);
 * } else {
 *   console.log("Encrypted Token:", encryptedToken);
 *   console.log("Payload:", payload);
 * }
 */
export async function createToken(accountId, duration) {
  let currentDate = new Date();

  const expirationTime = new Date(currentDate.getTime() + duration * 3600000);

  const id = nanoid();
  if (!id) {
    return [
      null,
      null,
      "Failed to generate random UUID. Please try again later.",
    ];
  }

  const payload = {
    id: id,
    accountId: accountId,
    createdAt: currentDate,
    expiredAt: expirationTime,
  };

  const encryptedToken = await new jose.EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .encrypt(key);

  return [encryptedToken, payload, null];
}

/**
 * Verify the validity of a JWT token.
 * @param {string} token - The JWT token to be verified.
 * @returns {Promise<[boolean, Object|null]>} A Promise that resolves with an array containing:
 * - A boolean indicating whether the token is valid or not.
 * - The token payload object if the token is valid, or null if the token is invalid.
 * @example
 * // Usage example:
 * const [isValid, payload] = await verifyToken("your_jwt_token_here");
 * if (isValid) {
 *   console.log("Token is valid.");
 *   console.log("Payload:", payload);
 * } else {
 *   console.log("Token is invalid or expired.");
 * }
 */
export async function verifyToken(token) {
  const payload = await wrapper(token);

  if (!payload) {
    return [false, null];
  }

  if (isExpired(payload)) {
    return [false, payload];
  }

  return [true, payload];
}

function isExpired(payload) {
  const currentTime = new Date();
  const expireTime = new Date(payload.expiredAt);

  return currentTime > expireTime;
}

async function wrapper(token) {
  try {
    const { payload, protectedHeader } = await jose.jwtDecrypt(token, key);
    return payload;
  } catch (e) {
    if (e instanceof jose.errors.JWEDecryptionFailed) {
      return null;
    }
  }
}
