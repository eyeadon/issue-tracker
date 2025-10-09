import { IssueStatusBadge } from "@/app/components";
import AssignedUser from "@/app/components/AssignedUser";
import { Issue, Status } from "@/app/generated/prisma";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  pageSize: string;
  assignee: string;
}

interface Props {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const searchParamsData = await searchParams;
  const { orderBy } = searchParamsData;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: { ...searchParamsData, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === orderBy && <ArrowUpIcon className="inline" />}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => {
          return (
            <Table.Row key={issue.id} align="center">
              <Table.RowHeaderCell>
                <Flex align="center" minHeight="2rem">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </Flex>
                <div className="block md:hidden pt-2">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <AssignedUser issue={issue} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  {
    label: "Assigned To",
    value: "assignedToUserId",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
