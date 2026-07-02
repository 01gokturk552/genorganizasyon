export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  const checks = {
    DATABASE_URL:    !!process.env.DATABASE_URL,
    DIRECT_URL:      !!process.env.DIRECT_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL:    process.env.NEXTAUTH_URL ?? "(eksik)",
    NODE_ENV:        process.env.NODE_ENV,
  };

  let dbOk = false;
  let dbError = "";
  let userFound = false;
  let passwordMatch = false;

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;

    const user = await prisma.user.findUnique({ where: { email: "admin@genorganizasyon.org" } });
    userFound = !!user;
    if (user) {
      passwordMatch = await bcrypt.compare("GenAdmin2024!", user.password);
    }
  } catch (e: unknown) {
    dbError = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json({ checks, db: { ok: dbOk, error: dbError }, auth: { userFound, passwordMatch } });
}
