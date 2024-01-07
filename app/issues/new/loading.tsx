import { Container } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

export default function LoadingNewIssuePage() {
  const gapY = 'mb-3';
  return (
    <Container size={'2'}>
      <Skeleton width={'14rem'} className={gapY} />
      <Skeleton className={gapY} />
      <Skeleton height={'24rem'} className={gapY} />
      <Skeleton height={'2rem'} width={'7rem'} />
    </Container>
  );
}
