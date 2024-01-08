import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

export default async function page({ params }: { params: { id: string } }) {
	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!issue) notFound();

	return <IssueForm heading="Edit this issue" issue={issue} />;
}
