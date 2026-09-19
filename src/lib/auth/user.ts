import { db } from "@/src/prisma/db";

export async function findUserByEmail(
  email: string,
) {
  return db.orm.public.User
    .where({
      email: email.toLowerCase(),
    })
    .first();
}

export async function findUserByUsername(
  username: string,
) {
  return db.orm.public.User
    .where({ username })
    .first();
}

export async function createUser(input: {
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}) {
  return db.orm.public.User.create({
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash,
    firstName: input.firstName ?? null,
    lastName: input.lastName ?? null,
    username: input.username ?? null,
  });
}
