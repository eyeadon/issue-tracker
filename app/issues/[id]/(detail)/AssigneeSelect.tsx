"use client";
import { Skeleton } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useUsers from "../../_hooks/useUsers";
import { useRouter } from "next/navigation";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  const assignIssue = async (userId: string | null) => {
    let statusUpdateOnAssign: string = "IN_PROGRESS";

    if (userId === "unassigned") {
      userId = null;
      statusUpdateOnAssign = issue.status;
    }

    await axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
        status: statusUpdateOnAssign,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });

    router.refresh();
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
