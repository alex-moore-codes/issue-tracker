import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	const body = await request.json();
	const validation = issueSchema.safeParse(body);

	if (!validation.success)
		return NextResponse.json(validation.error.format(), { status: 400 });

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
