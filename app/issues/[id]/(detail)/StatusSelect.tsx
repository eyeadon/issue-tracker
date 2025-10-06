"use client";
import { Issue, Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const statusChoices: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const changeStatus = async (selectedStatus: Status) => {
    await axios
      .patch("/api/issues/" + issue.id, {
        status: selectedStatus,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
        <Select.Trigger placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            {statusChoices?.map((status) => (
              <Select.Item key={status.label} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
