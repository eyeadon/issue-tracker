import Pagination from "@/app/components/Pagination";
import { Status } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchParamsData = await searchParams;
  const { status, orderBy, page, pageSize, assignee } = searchParamsData;

  let pageSizeAsNumber = parseInt(pageSize);
  // default page size
  if (!pageSizeAsNumber) pageSizeAsNumber = 10;

  const statuses = Object.values(Status);

  // passing undefined to prisma will return no result for that operation
  const statusToFilter = statuses.includes(status) ? status : undefined;

  let order = columnNames.includes(orderBy) ? { [orderBy]: "desc" } : undefined;

  // default sort order for initial page load
  if (!order) order = { createdAt: "desc" };

  const currentPage = parseInt(page) || 1;

  let assigneeSelection: string | undefined = assignee;
  if (assigneeSelection === "unassigned") assigneeSelection = undefined;

  const issues = await prisma.issue.findMany({
    where: { status: statusToFilter, assignedToUserId: assigneeSelection },
    orderBy: order,
    skip: (currentPage - 1) * pageSizeAsNumber,
    take: pageSizeAsNumber,
  });

  const issueCount = await prisma.issue.count({
    where: { status: statusToFilter, assignedToUserId: assigneeSelection },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSizeAsNumber}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0; // in seconds

export default IssuesPage;
export const metadata: Metadata = {
  title: "Issue Tracker | Issue List",
  description: "View all project issues",
};
