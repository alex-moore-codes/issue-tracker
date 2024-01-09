"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Heading, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueData = z.infer<typeof issueSchema>;

interface IssueFormProps {
   heading: string;
   issue?: Issue;
}

export default function IssueForm({ heading, issue }: IssueFormProps) {
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IssueData>({ resolver: zodResolver(issueSchema) });
   const router = useRouter();
   const [error, setError] = useState("");
   const [isSubmitting, setSubmitting] = useState(false);
   const onSubmit = handleSubmit(async (data) => {
      try {
         setSubmitting(true);
         if (issue) {
            await axios.patch(`/api/issues/${issue.id}`, data);
         } else {
            await axios.post("/api/issues", data);
         }
         router.push("/issues/list");
         router.refresh();
      } catch (error) {
         setSubmitting(false);
         setError("An internal error occurred. Please try again.");
         setTimeout(() => setError(""), 3000);
      }
   });

   return (
      <>
         <Heading mb={"3"}>{heading}</Heading>
         <form onSubmit={onSubmit}>
            <TextField.Root mb={"3"}>
               <TextField.Input
                  placeholder="Give your issue a title..."
                  defaultValue={issue?.title}
                  {...register("title")}
               />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
               name="description"
               defaultValue={issue?.description}
               control={control}
               render={({ field }) => (
                  <SimpleMDE placeholder="Describe your issue..." {...field} />
               )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={isSubmitting}>
               {issue ? "Update Issue" : "Submit Issue"}{" "}
               {isSubmitting && <Spinner />}
            </Button>
         </form>
         {error && (
            <Callout.Root color="red" role="alert" className="mt-5">
               <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
         )}
      </>
   );
}
