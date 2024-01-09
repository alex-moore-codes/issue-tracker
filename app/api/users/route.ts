import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
   const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

   if (!users)
      return NextResponse.json(
         { error: "An unexpected error occurred." },
         { status: 500 },
      );

   return NextResponse.json(users, { status: 200 });
}
