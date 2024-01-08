"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [isDeleting, setDeleting] = useState(false);

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red" variant="soft" disabled={isDeleting}>
						Delete Issue
						{isDeleting && <Spinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content style={{ maxWidth: 450 }}>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description size="2">
						Are you sure you want to delete this issue? This action cannot be
						undone.
					</AlertDialog.Description>

					<Flex gap="3" mt="4" justify="end">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button
								onClick={async () => {
									try {
										setDeleting(true);
										await axios.delete(`/api/issues/${issueId}`);
										router.push("/issues/list");
										router.refresh();
									} catch (error) {
										setDeleting(false);
										setError(true);
									}
								}}
								variant="solid"
								color="red"
							>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						This issue could not be deleted. An unknown error occurred.
					</AlertDialog.Description>
					<Button
						color="gray"
						variant="soft"
						onClick={() => setError(false)}
						mt={"3"}
					>
						OK
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
}
