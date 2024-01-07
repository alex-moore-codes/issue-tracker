import { Skeleton } from '@/app/components';
import { Card, Container, Flex } from '@radix-ui/themes';

export default function LoadingIssueDetailsPage() {
  return (
    <Container size={'3'}>
      <Skeleton className="mb-3" width={'16rem'} />

      <Flex gap={'4'} mb={'5'}>
        <Skeleton width={'5rem'} />
        <Skeleton width={'8rem'} />
      </Flex>
      <Card>
        <Skeleton count={4} />
        <Skeleton width={'12rem'} />
      </Card>
    </Container>
  );
}