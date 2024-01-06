import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Card, Container, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';

export default async function page({ params }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return (
    <Container>
      <Heading mb={'3'}>{issue.title}</Heading>
      <Flex gap={'4'} mb={'3'}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </Container>
  );
}
