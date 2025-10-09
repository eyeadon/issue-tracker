"use client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import useUsers from "../_hooks/useUsers";

const IssueAssigneeFilter = () => {
  const router = useRouter();
  // read-only
  const searchParams = useSearchParams();
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <Select.Root
      defaultValue={searchParams.get("assignee") || ""}
      onValueChange={(selection) => {
        const params = new URLSearchParams(searchParams.toString());

        // replace status value
        if (selection) {
          if (searchParams.has("assignee")) params.delete("assignee");
          params.append("assignee", selection);
        }

        const query = params.size ? "?" + params.toString() : "";

        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Assignee..." />
      <Select.Content>
        <Select.Item value="unassigned">Unassigned</Select.Item>
        {users?.map((user) => (
          // must have value that is not an empty string
          <Select.Item key={user.id} value={user.id || " "}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssigneeFilter;
