import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LENGTH).toString("hex");

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

  if (salt.length !== SALT_LENGTH * 2) {
    return false;
  }

  if (key.length !== KEY_LENGTH * 2) {
    return false;
  }

  if (!/^[0-9a-f]+$/i.test(salt) || !/^[0-9a-f]+$/i.test(key)) {
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
