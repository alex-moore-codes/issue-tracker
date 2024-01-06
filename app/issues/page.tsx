import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <Button>
      <Link href={'/issues/new'}>Create New Issue</Link>
    </Button>
  );
}
