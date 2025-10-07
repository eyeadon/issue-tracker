import prisma from "@/lib/prisma";
import { Avatar, Flex } from "@radix-ui/themes";
import { Issue } from "../generated/prisma";

const AssignedUser = async ({ issue }: { issue: Issue }) => {
  const user = await prisma.user.findFirst({
    where: {
      assignedIssues: {
        some: {
          id: issue.id,
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

export default AssignedUser;
