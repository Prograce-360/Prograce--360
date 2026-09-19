import { NextResponse } from "next/server";
import { destroySession } from "@/src/lib/auth/session";

export async function POST() {
  try {
    await destroySession();

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("LOGOUT_ERROR", error);

    return NextResponse.json(
      {
        error:
          "Impossible de fermer la session.",
      },
      { status: 500 },
    );
  }
}
