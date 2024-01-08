import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function IssueActions() {
	return (
		<div>
			<Button mb={"4"}>
				<Link href={"/issues/new"}>Create New Issue</Link>
			</Button>
		</div>
	);
}
