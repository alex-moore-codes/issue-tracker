'use client';
import { Button, Heading, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});
import 'easymde/dist/easymde.min.css';

export default function page() {
  return (
    <div className="max-w-2xl">
      <Heading as="h1" mb={'3'}>
        Submit a new issue
      </Heading>
      <TextField.Root mb={'3'}>
        <TextField.Input placeholder="Give your issue a title..." />
      </TextField.Root>
      <SimpleMDE placeholder="Describe your issue..." />
      <Button>Submit Issue</Button>
    </div>
  );
}
