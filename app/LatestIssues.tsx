import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import Link from "@/app/components/Link";

export default async function LatestIssues() {
   const latestIssues = await prisma.issue.findMany({
      orderBy: {
         createdAt: "desc",
      },
      take: 5,
      include: {
         assignedToUser: true,
      },
   });

   return (
      <Card>
         <Heading size={"3"} mb={"5"}>
            Latest Issues
         </Heading>
         <Table.Root>
            <Table.Body>
               {latestIssues.map((issue) => (
                  <Table.Row key={issue.id}>
                     <Table.Cell>
                        <Flex direction={"row"} justify={"between"}>
                           <Flex direction={"column"} gap={"3"} align={"start"}>
                              <Text size={"3"}>
                                 <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                 </Link>
                              </Text>
                              <IssueStatusBadge status={issue.status} />
                           </Flex>
                           {issue.assignedToUser && (
                              <Avatar
                                 src={issue.assignedToUser.image!}
                                 fallback="?"
                              />
                           )}
                        </Flex>
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </Card>
   );
}
