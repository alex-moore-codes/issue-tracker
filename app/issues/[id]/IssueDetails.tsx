import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

export default function IssueDetails({ issue }: { issue: Issue }) {
	return (
		<>
			<Heading mb={"3"}>{issue.title}</Heading>
			<Flex gap={"4"} mb={"5"}>
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className="prose max-w-full">
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</>
	);
}
