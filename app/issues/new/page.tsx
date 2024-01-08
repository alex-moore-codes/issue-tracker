import { Heading, Container } from "@radix-ui/themes";
import IssueForm from "../_components/IssueForm";

export default function NewIssuePage() {
	return (
		<Container size={"2"}>
			<Heading mb={"3"}>Submit a new issue</Heading>
			<IssueForm />
		</Container>
	);
}
