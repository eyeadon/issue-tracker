import { Comment } from "@/app/generated/prisma";
import { Card, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ comment }: { comment: Comment }) => {
  return (
    <>
      <Text>{comment.createdAt.toDateString()}</Text>
      <Card className="prose max-w-full" mt="2" mb="5">
        <ReactMarkdown>{comment.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
