import { authOptions } from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   const session = await getServerSession(authOptions);
   if (!session)
      return NextResponse.json(
         { error: "Unauthorized: No user session." },
         { status: 401 },
      );
   const body = await request.json();
   const validation = patchIssueSchema.safeParse(body);

   if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

   if (body.assignedToUserId) {
      const user = await prisma.user.findUnique({
         where: {
            id: body.assignedToUserId,
         },
      });
      if (!user)
         return NextResponse.json(
            { error: "User not found." },
            { status: 400 },
         );
   }

   const issue = await prisma.issue.findUnique({
      where: {
         id: parseInt(params.id),
      },
   });

   if (!issue)
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });

   const updatedIssue = await prisma.issue.update({
      where: {
         id: issue.id,
      },
      data: {
         title: body.title,
         description: body.description,
         assignedToUserId: body.assignedToUserId,
      },
   });

   if (!updatedIssue)
      return NextResponse.json(
         { error: "An unknown error occurred" },
         { status: 500 },
      );

   return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
   request: NextRequest,
   { params }: { params: { id: string } },
) {
   const session = await getServerSession(authOptions);
   if (!session)
      return NextResponse.json(
         { error: "Unauthorized: No user session." },
         { status: 401 },
      );

   const issue = await prisma.issue.findUnique({
      where: {
         id: parseInt(params.id),
      },
   });

   if (!issue)
      return NextResponse.json({ error: "Issue not found." }, { status: 404 });

   const deletedIssue = await prisma.issue.delete({
      where: {
         id: issue.id,
      },
   });

   if (!deletedIssue)
      return NextResponse.json(
         { error: "An internal error occurred" },
         { status: 500 },
      );

   return NextResponse.json(deletedIssue, { status: 200 });
}
