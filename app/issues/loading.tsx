import {
  Table,
  TableRow,
  TableColumnHeaderCell,
  TableBody,
  TableCell,
} from '@radix-ui/themes';
import { Container } from '@radix-ui/themes';
import React from 'react';
import IssueActions from './IssueActions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
            <TableRow key={issue}>
              <TableCell>
                <Skeleton />
                <div className="block mt-2 md:mt-0 md:hidden">
                  <Skeleton />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Container>
  );
}
