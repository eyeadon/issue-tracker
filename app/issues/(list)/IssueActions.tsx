import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssuePageSizeFilter from "./IssuePageSizeFilter";

const IssueActions = () => {
  return (
    <Flex justify="start" gap="2">
      <IssueStatusFilter />
      <IssuePageSizeFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
