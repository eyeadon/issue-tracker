"use client";
import { commentSchema } from "@/app/api/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@/app/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import useUsers from "../_hooks/useUsers";
import { Skeleton } from "@/app/components";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type IssueCommentFormData = z.infer<typeof commentSchema>;

const IssueCommentForm = ({
  issue,
  session,
}: {
  issue?: Issue;
  session?: Session;
}) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueCommentFormData>({
    resolver: zodResolver(commentSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const { data: users, error: queryError, isLoading } = useUsers();
  if (queryError) return null;
  if (isLoading) return <Skeleton />;

  if (!issue) return null;
  if (!session) return null;
  const foundUser = users!.find((user) => user.email === session!.user!.email);
  if (!foundUser) return null;

  const onSubmit = handleSubmit(async (data) => {
    const newComment = {
      description: data.description,
      authorId: foundUser.id,
      issueId: issue.id,
    };

    try {
      setSubmitting(true);
      console.log(data);

      // const { data: newCommentData, status } = await axios.post(
      const result = await axios.post("/api/comments", newComment);
      console.log(result);

      router.refresh();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      setError("An unexpected error occured");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <Controller
          name="description"
          control={control}
          // defaultValue=""
          render={({ field }) => <SimpleMDE placeholder="Comment" {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit Comment
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueCommentForm;
