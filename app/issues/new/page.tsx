"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/api/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            console.log(data);
            const result = await axios.post("/api/issues", data);
            console.log(result);
            router.push("/issues");
          } catch (error) {
            console.log(error);
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")}>
          {/* // slot is for buttons and icons
        <TextField.Slot></TextField.Slot> */}
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
