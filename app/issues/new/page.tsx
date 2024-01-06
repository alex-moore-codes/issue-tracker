'use client';
import {
  Container,
  Button,
  Heading,
  TextField,
  Callout,
} from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

interface NewIssueFormProps {
  title: string;
  description: string;
}

export default function page() {
  const { register, control, handleSubmit } = useForm<NewIssueFormProps>();
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <Container size={'2'}>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An internal error occurred. Please try again.');
            setTimeout(() => setError(''), 3000);
          }
        })}
      >
        <Heading as="h1" mb={'3'}>
          Submit a new issue
        </Heading>
        <TextField.Root mb={'3'}>
          <TextField.Input
            placeholder="Give your issue a title..."
            {...register('title')}
          />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe your issue..." {...field} />
          )}
        />
        <Button>Submit Issue</Button>
      </form>
      {error && (
        <Callout.Root className="mt-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </Container>
  );
}
