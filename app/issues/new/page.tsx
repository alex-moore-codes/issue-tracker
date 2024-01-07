'use client';
import { ErrorMessage, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Callout,
  Container,
  Heading,
  TextField,
} from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

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
        <Callout.Root color="red" role="alert" className="mt-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </Container>
  );
}
