import { NextResponse } from "next/server";
import { hashPassword } from "@/src/lib/auth/password";
import {
  createUser,
    findUserByEmail,
      findUserByUsername,
      } from "@/src/lib/auth/user";
      import { createSession } from "@/src/lib/auth/session";

      export async function POST(request: Request) {
        try {
            const body = await request.json();

                const email = String(body.email ?? "").trim().toLowerCase();
                    const password = String(body.password ?? "");
                        const firstName = String(body.firstName ?? "").trim();
                            const lastName = String(body.lastName ?? "").trim();
                                const username = String(body.username ?? "").trim();

                                    if (!email || !password || !firstName) {
                                          return NextResponse.json(
                                                  { error: "Veuillez remplir les champs obligatoires." },
                                                          { status: 400 },
                                                                );
                                                                    }

                                                                        if (password.length < 8) {
                                                                              return NextResponse.json(
                                                                                      { error: "Le mot de passe doit contenir au moins 8 caractères." },
                                                                                              { status: 400 },
                                                                                                    );
                                                                                                        }

                                                                                                            const existingEmail = await findUserByEmail(email);

                                                                                                                if (existingEmail) {
                                                                                                                      return NextResponse.json(
                                                                                                                              { error: "Cette adresse e-mail est déjà utilisée." },
                                                                                                                                      { status: 409 },
                                                                                                                                            );
                                                                                                                                                }

                                                                                                                                                    if (username) {
                                                                                                                                                          const existingUsername = await findUserByUsername(username);

                                                                                                                                                                if (existingUsername) {
                                                                                                                                                                        return NextResponse.json(
                                                                                                                                                                                  { error: "Ce nom d'utilisateur est déjà utilisé." },
                                                                                                                                                                                            { status: 409 },
                                                                                                                                                                                                    );
                                                                                                                                                                                                          }
                                                                                                                                                                                                              }

                                                                                                                                                                                                                  const user = await createUser({
                                                                                                                                                                                                                        email,
                                                                                                                                                                                                                              passwordHash: hashPassword(password),
                                                                                                                                                                                                                                    firstName,
                                                                                                                                                                                                                                          lastName,
                                                                                                                                                                                                                                                username: username || undefined,
                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                        await createSession(user.id);

                                                                                                                                                                                                                                                            return NextResponse.json(
                                                                                                                                                                                                                                                                  {
                                                                                                                                                                                                                                                                          ok: true,
                                                                                                                                                                                                                                                                                  user: {
                                                                                                                                                                                                                                                                                            id: user.id,
                                                                                                                                                                                                                                                                                                      email: user.email,
                                                                                                                                                                                                                                                                                                                firstName: user.firstName,
                                                                                                                                                                                                                                                                                                                          lastName: user.lastName,
                                                                                                                                                                                                                                                                                                                                    username: user.username,
                                                                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                                                                                                        { status: 201 },
                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                              } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                  console.error("REGISTER_ERROR", error);

                                                                                                                                                                                                                                                                                                                                                                      return NextResponse.json(
                                                                                                                                                                                                                                                                                                                                                                            { error: "Impossible de créer le compte pour le moment." },
                                                                                                                                                                                                                                                                                                                                                                                  { status: 500 },
                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                        }