import { Container } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

export default function NewIssuePage() {
	return (
		<Container size={"2"}>
			<IssueForm heading="Submit a new issue" />
		</Container>
	);
}
