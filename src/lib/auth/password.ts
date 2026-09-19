import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");

  const hash = scryptSync(
    password,
    salt,
    KEY_LENGTH,
  ).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(
  password: string,
  storedHash: string,
): boolean {
  const [salt, key] = storedHash.split(":");

  if (!salt || !key) {
    return false;
  }

  const storedKey = Buffer.from(key, "hex");

  const derivedKey = scryptSync(
    password,
    salt,
    KEY_LENGTH,
  );

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(
    storedKey,
    derivedKey,
  );
}
