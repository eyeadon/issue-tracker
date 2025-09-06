import React from "react";
import { Skeleton } from "@/app/components";
import IssueActions from "./IssueActions";

const LoadingIssuesPage = () => {
  return (
    <div>
      <IssueActions />
      <Skeleton count={5} />
    </div>
  );
};

export default LoadingIssuesPage;
