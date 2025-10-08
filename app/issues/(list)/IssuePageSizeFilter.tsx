"use client";
import { Select } from "@radix-ui/themes";
import { nanoid } from "nanoid";
import { useRouter, useSearchParams } from "next/navigation";

const pageSizeChoices: { label: string; value: number }[] = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
];

const IssuePageSizeFilter = () => {
  const router = useRouter();
  // read-only
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("pageSize") || ""}
      onValueChange={(selection) => {
        const params = new URLSearchParams(searchParams.toString());

        // replace pageSize value
        if (selection) {
          if (searchParams.has("pageSize")) params.delete("pageSize");
          params.append("pageSize", selection);
        }

        const query = params.size ? "?" + params.toString() : "";

        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Page Size..." />
      <Select.Content>
        {pageSizeChoices.map((pageSize) => {
          const generatedId = nanoid();

          return (
            <Select.Item
              key={pageSize.value + generatedId}
              // must have value that is not an empty string
              value={pageSize.value.toString() || " "}
            >
              {pageSize.label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuePageSizeFilter;
