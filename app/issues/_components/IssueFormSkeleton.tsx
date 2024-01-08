import { Skeleton } from "@/app/components";
import { Container } from "@radix-ui/themes";

export default function IssueFormSkeleton() {
	const gapY = "mb-3";

	return (
		<Container size={"2"}>
			<Skeleton width={"15rem"} height={"2rem"} className={gapY} />
			<Skeleton height={"2rem"} className={gapY} />
			<Skeleton height={"24rem"} className={gapY} />
			<Skeleton height={"2rem"} width={"7rem"} />
		</Container>
	);
}
