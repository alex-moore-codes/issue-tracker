import { IssueStatusBadge } from "@/app/components";
import Link from "next/link";
import prisma from "@/prisma/client";
import {
   Table,
   TableBody,
   TableCell,
   TableColumnHeaderCell,
   TableRow,
} from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
   searchParams: {
      status: Status;
      orderBy: keyof Issue;
      page: string;
   };
}

export default async function page({ searchParams }: Props) {
   const columns: { label: string; value: keyof Issue; classNames?: string }[] =
      [
         {
            label: "Issue",
            value: "title",
         },
         {
            label: "Status",
            value: "status",
            classNames: "hidden md:table-cell",
         },
         {
            label: "Created Date",
            value: "createdAt",
            classNames: "hidden md:table-cell",
         },
      ];

   const statuses = Object.values(Status);
   const status = statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;
   const where = { status: status };

   const orderBy = columns
      .map((column) => column.value)
      .includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "asc" }
      : undefined;

   const pageSize = 10;
   const currentPage = parseInt(searchParams.page) || 1;

   const issuesCount = await prisma.issue.count({ where });

   const issues = await prisma.issue.findMany({
      where,
      orderBy,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
   });

   return (
      <>
         <IssueActions />
         <Table.Root variant="surface">
            <Table.Header>
               <TableRow>
                  {columns.map((column) => (
                     <TableColumnHeaderCell
                        key={column.value}
                        className={column.classNames}
                     >
                        <Link
                           href={{
                              query: { ...searchParams, orderBy: column.value },
                           }}
                        >
                           {column.label}
                        </Link>
                        {column.value === searchParams.orderBy && (
                           <ArrowUpIcon className="inline ml-1" />
                        )}
                     </TableColumnHeaderCell>
                  ))}
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
         <Pagination
            itemCount={issuesCount}
            pageSize={pageSize}
            currentPage={currentPage}
         />
      </>
   );
}

export const dynamic = "force-dynamic";
