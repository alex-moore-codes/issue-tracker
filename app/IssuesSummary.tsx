import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default function IssueSummary({ open, inProgress, closed }: Props) {
  const containers: { label: string; value: number; status: Status }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];

  return (
    <Flex direction={"row"} gap={"4"} align={"stretch"} justify={"between"}>
      {containers.map((container, index) => (
        <Card key={index} className="w-full">
          <Flex direction={"column"} gap={"4"}>
            <Link
              href={`/issues/list?status=${container.status}`}
              className="tex-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size={"7"} className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
