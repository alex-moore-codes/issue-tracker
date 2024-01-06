'use client';
import {
  Box,
  Button,
  Container,
  Heading,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import React from 'react';

export default function page() {
  return (
    <div className="max-w-2xl">
      <Heading as="h1" mb={'3'}>
        Submit a new issue
      </Heading>
      <TextField.Root mb={'3'}>
        <TextField.Input placeholder="Give your issue a title..." />
      </TextField.Root>
      <TextArea placeholder="Describe your issue..." mb={'3'} />
      <Button>Submit Issue</Button>
    </div>
  );
}
