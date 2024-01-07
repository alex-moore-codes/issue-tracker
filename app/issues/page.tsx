import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableRow,
} from '@radix-ui/themes';
import React from 'react';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay';
import IssueActions from './IssueActions';
import Link from '../components/Link';

export default async function page() {
  const issues = await prisma.issue.findMany();
  await delay(1000);

  return (
    <Container size={'4'}>
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
    </Container>
  );
}
