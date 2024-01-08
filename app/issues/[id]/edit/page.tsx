import prisma from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";
import { Container, Heading } from "@radix-ui/themes";

export default async function page({ params }: { params: { id: string } }) {
	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!issue) notFound();

	return (
		<Container size={"2"}>
			<Heading mb={"3"}>Edit your issue</Heading>
			<IssueForm issue={issue} />
		</Container>
	);
}
