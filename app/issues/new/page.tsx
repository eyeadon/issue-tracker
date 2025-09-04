"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

interface IssueForm {
  title: string;
  description: string;
}

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

const NewIssuePage = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        console.log(data);
        const result = await axios.post("/api/issues", data);
        console.log(result);
        router.push("/issues");
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")}>
        {/* // slot is for buttons and icons
        <TextField.Slot></TextField.Slot> */}
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit Issue</Button>
    </form>
  );
};

export default NewIssuePage;
