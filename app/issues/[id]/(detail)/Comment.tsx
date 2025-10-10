import CommentAuthor from "@/app/components/CommentAuthor";
import { Comment } from "@/app/generated/prisma";
import { Card, Flex, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ comment }: { comment: Comment }) => {
  return (
    <>
      <Flex align="center" gap="3" my="2">
        <Text>{comment.createdAt.toDateString()}</Text>
        <CommentAuthor comment={comment} />
      </Flex>

      <Card className="prose max-w-full" mt="2" mb="5">
        <ReactMarkdown>{comment.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
