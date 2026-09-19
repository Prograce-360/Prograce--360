import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

import { db } from "@/src/prisma/db";

export const SESSION_COOKIE = "prograce_session";

const SESSION_DAYS = 30;

function hashToken(token: string): string {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");

  const tokenHash = hashToken(token);

  const expiresAt = new Date(
    Date.now() +
      SESSION_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  await db.orm.public.UserSession.create({
    userId,
    tokenHash,
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });

  return token;
}

export async function getSessionToken() {
  const cookieStore = await cookies();

  return (
    cookieStore.get(SESSION_COOKIE)?.value ??
    null
  );
}

export async function getUserFromSessionToken(
  token: string | null,
) {
  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);

  const session =
    await db.orm.public.UserSession
      .where({ tokenHash })
      .first();

  if (!session) {
    return null;
  }

  if (
    new Date(session.expiresAt).getTime() <=
    Date.now()
  ) {
    await db.orm.public.UserSession
      .where({ id: session.id })
      .delete();

    return null;
  }

  const user =
    await db.orm.public.User
      .where({ id: session.userId })
      .first();

  if (!user || !user.isActive) {
    return null;
  }

  return user;
}

export async function getCurrentUser() {
  const token = await getSessionToken();

  return getUserFromSessionToken(token);
}

export async function destroySession() {
  const token = await getSessionToken();

  if (token) {
    const tokenHash = hashToken(token);

    await db.orm.public.UserSession
      .where({ tokenHash })
      .delete();
  }

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
