import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth/session";

export async function GET() {
  try {
      const user = await getCurrentUser();

          if (!user) {
                return NextResponse.json(
                        { authenticated: false },
                                { status: 401 },
                                      );
                                          }

                                              return NextResponse.json({
                                                    authenticated: true,
                                                          user: {
                                                                  id: user.id,
                                                                          email: user.email,
                                                                                  firstName: user.firstName,
                                                                                          lastName: user.lastName,
                                                                                                  username: user.username,
                                                                                                          language: user.language,
                                                                                                                  currency: user.currency,
                                                                                                                        },
                                                                                                                            });
                                                                                                                              } catch (error) {
                                                                                                                                  console.error("ME_ERROR", error);

                                                                                                                                      return NextResponse.json(
                                                                                                                                            { error: "Impossible de récupérer votre session." },
                                                                                                                                                  { status: 500 },
                                                                                                                                                      );
                                                                                                                                                        }
                                                                                                                                                        }