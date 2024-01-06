import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableRow,
} from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import prisma from '@/prisma/client';

export default async function page() {
  const issues = await prisma.issue.findMany();

  return (
    <Container size={'4'}>
      <Button mb={'4'}>
        <Link href={'/issues/new'}>Create New Issue</Link>
      </Button>
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
                {issue.title}
                <div className="block md:hidden">{issue.status}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.description}
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
