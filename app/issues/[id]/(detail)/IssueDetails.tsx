import { IssueStatusBadge } from "@/app/components";
import AssignedUser from "@/app/components/AssignedUser";
import { Issue } from "@/app/generated/prisma";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex align="center" gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
        <AssignedUser issue={issue} />
      </Flex>
      <Card className="prose max-w-full" m="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
