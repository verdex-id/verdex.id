import { nanoid } from "nanoid";
import * as jose from "jose";

const key = jose.base64url.decode(process.env.TOKEN_SYMMETRIC_KEY);
/**
 * Creates a new encrypted token with the given user ID and duration.
 * @param {string} userId The ID of the user for whom the token is created.
 * @param {number} duration The duration of the token validity in minutes.
 * @returns {Promise<[string, object]>} A promise that resolves to an array containing the encrypted token and payload.
 */
export async function createToken(userId, duration) {
  let currentDate = new Date();

  const expirationTime = new Date(currentDate.getTime() + duration * 60000);

  const payload = {
    id: nanoid(),
    userId: userId,
    createdAt: currentDate,
    expiredAt: expirationTime,
  };

  const encryptedToken = await new jose.EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .encrypt(key);

  return [encryptedToken, payload];
}

/**
 * Verifies the validity of a token by decrypting and checking its payload.
 * @param {string} token The token to be verified.
 * @returns {Promise<{ isValid: boolean, payload: object }>} A promise that resolves to an object indicating whether the token is valid and its payload.
 */
export async function verifyToken(token) {
  const { payload, protectedHeader } = await jose.jwtDecrypt(token, key);

  if (isExpired(payload)) {
    return {
      isValid: false,
      payload: payload,
    };
  }

  return {
    isValid: true,
    payload: payload,
  };
}

function isExpired(payload) {
  const currentTime = new Date();
  const expireTime = new Date(payload.expiredAt);

  return currentTime > expireTime;
}
