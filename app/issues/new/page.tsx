'use client';
import { Button, Container, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';

export default function page() {
  return (
    <Container size={'1'}>
      <TextField.Root mb={'3'}>
        <TextField.Input placeholder="Give your issue a title..." />
      </TextField.Root>
      <TextArea placeholder="Describe your issue..." mb={'3'} />
      <Button>Submit Issue</Button>
    </Container>
  );
}
