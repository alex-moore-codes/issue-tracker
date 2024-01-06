'use client';
import { Button, Heading, TextField } from '@radix-ui/themes';
// import dynamic from 'next/dynamic';
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//   ssr: false,
// });
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface NewIssueFormProps {
  title: string;
  description: string;
}

export default function page() {
  const { register, control, handleSubmit } = useForm<NewIssueFormProps>();
  const router = useRouter();

  return (
    <form
      className="max-w-2xl"
      onSubmit={handleSubmit(async (data) => {
        await fetch('/api/issues', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        router.push('/issues');
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
  );
}
