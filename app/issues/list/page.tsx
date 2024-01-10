import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssuesTable, { IssueQuery, columnNames } from "./IssuesTable";
import { Flex } from "@radix-ui/themes";

interface Props {
   searchParams: IssueQuery;
}

export default async function page({ searchParams }: Props) {
   const statuses = Object.values(Status);
   const status = statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;
   const where = { status: status };

   const orderBy = columnNames.includes(searchParams.orderBy)
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
      <Flex direction={"column"} gap={"3"}>
         <IssueActions />
         <IssuesTable issues={issues} searchParams={searchParams} />
         <Pagination
            itemCount={issuesCount}
            pageSize={pageSize}
            currentPage={currentPage}
         />
      </Flex>
   );
}

export const dynamic = "force-dynamic";
