'use client';
import {
  Container,
  Button,
  Heading,
  TextField,
  Callout,
  Text,
} from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';

type NewIssueFormProps = z.infer<typeof createIssueSchema>;

export default function page() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssueFormProps>({ resolver: zodResolver(createIssueSchema) });
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
        {errors.title && (
          <Text color="red" as="p" mb={'3'}>
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe your issue..." {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p" mb={'3'}>
            {errors.description.message}
          </Text>
        )}
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
