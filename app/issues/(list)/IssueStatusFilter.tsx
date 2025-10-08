"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { nanoid } from "nanoid";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  // read-only
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(selection) => {
        const params = new URLSearchParams(searchParams.toString());

        // replace status value
        if (selection) {
          if (searchParams.has("status")) params.delete("status");
          params.append("status", selection);
        }

        const query = params.size ? "?" + params.toString() : "";

        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Status..." />
      <Select.Content>
        {statuses.map((status) => {
          const generatedId = nanoid();
          return (
            <Select.Item
              key={status.value + generatedId}
              // must have value that is not an empty string
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
