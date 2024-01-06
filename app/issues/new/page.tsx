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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

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
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
      setError('An internal error occurred. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  });

  return (
    <Container size={'2'}>
      <form onSubmit={onSubmit}>
        <Heading as="h1" mb={'3'}>
          Submit a new issue
        </Heading>
        <TextField.Root mb={'3'}>
          <TextField.Input
            placeholder="Give your issue a title..."
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe your issue..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
      {error && (
        <Callout.Root color="red" className="mt-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
    </Container>
  );
}
