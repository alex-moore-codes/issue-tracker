import { Skeleton } from "@/app/components";

export default function IssueFormSkeleton() {
	const gapY = "mb-3";

	return (
		<>
			<Skeleton width={"15rem"} height={"2rem"} className={gapY} />
			<Skeleton height={"2rem"} className={gapY} />
			<Skeleton height={"24rem"} className={gapY} />
			<Skeleton height={"2rem"} width={"7rem"} />
		</>
	);
}
