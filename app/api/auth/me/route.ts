import { NextResponse } from "next/server";

import { getCurrentUser } from "@/src/lib/authentification/session";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Non authentifié.",
        },
        { status: 401 },
      );
    }

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
    console.error("ME_ERROR", error);

    return NextResponse.json(
      {
        error:
          "Impossible de récupérer votre session.",
      },
      { status: 500 },
    );
  }
}
