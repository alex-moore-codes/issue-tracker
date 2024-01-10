import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import {
   Table,
   TableBody,
   TableCell,
   TableColumnHeaderCell,
   TableRow,
} from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

interface Props {
   searchParams: { status: Status };
}

export default async function page({ searchParams }: Props) {
   const statuses = Object.values(Status);
   const status = statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;

   const issues = await prisma.issue.findMany({
      where: {
         status,
      },
   });

   return (
      <>
         <IssueActions />
         <Table.Root variant="surface">
            <Table.Header>
               <TableRow>
                  <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
                  <TableColumnHeaderCell className="hidden md:table-cell">
                     Status
                  </TableColumnHeaderCell>
                  <TableColumnHeaderCell className="hidden md:table-cell">
                     Created Date
                  </TableColumnHeaderCell>
               </TableRow>
            </Table.Header>
            <TableBody>
               {issues.map((issue) => (
                  <TableRow key={issue.id}>
                     <TableCell>
                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                        <div className="block mt-2 md:mt-0 md:hidden">
                           <IssueStatusBadge status={issue.status} />
                        </div>
                     </TableCell>
                     <TableCell className="hidden md:table-cell">
                        <IssueStatusBadge status={issue.status} />
                     </TableCell>
                     <TableCell className="hidden md:table-cell">
                        {issue.createdAt.toDateString()}
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table.Root>
      </>
   );
}

export const dynamic = "force-dynamic";
