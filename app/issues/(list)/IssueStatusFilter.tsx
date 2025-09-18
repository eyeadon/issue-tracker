"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => {
          const generatedId = nanoid();
          return (
            <Select.Item
              key={status.value + generatedId}
              value={status.value || " "}
            >
              {status.label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
