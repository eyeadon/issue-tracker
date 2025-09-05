import { Badge, Flex } from "@radix-ui/themes";
import React from "react";
import { Status } from "../generated/prisma";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <div>
      <Flex gap="2">
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
      </Flex>
    </div>
  );
};

export default IssueStatusBadge;
