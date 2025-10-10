import prisma from "@/lib/prisma";
import { Avatar, Flex } from "@radix-ui/themes";
import { Comment } from "../generated/prisma";

const CommentAuthor = async ({ comment }: { comment: Comment }) => {
  const user = await prisma.user.findFirst({
    where: {
      commentsAuthored: {
        some: {
          id: comment.id,
        },
      },
    },
  });

  return (
    <div>
      <Flex gap="2">
        {user && (
          <Avatar src={user.image!} fallback="?" size="2" radius="full" />
        )}
      </Flex>
    </div>
  );
};

export default CommentAuthor;
