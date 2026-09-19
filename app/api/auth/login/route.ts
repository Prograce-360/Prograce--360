import { NextResponse } from "next/server";
import { verifyPassword } from "@/src/lib/auth/password";
import { findUserByEmail } from "@/src/lib/auth/user";
import { createSession } from "@/src/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            "Veuillez renseigner votre e-mail et votre mot de passe.",
        },
        { status: 400 },
      );
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          error: "E-mail ou mot de passe incorrect.",
        },
        { status: 401 },
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          error:
            "Ce compte est actuellement désactivé.",
        },
        { status: 403 },
      );
    }

    const validPassword = verifyPassword(
      password,
      user.passwordHash,
    );

    if (!validPassword) {
      return NextResponse.json(
        {
          error: "E-mail ou mot de passe incorrect.",
        },
        { status: 401 },
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("LOGIN_ERROR", error);

    return NextResponse.json(
      {
        error:
          "Impossible de vous connecter pour le moment.",
      },
      { status: 500 },
    );

  }
