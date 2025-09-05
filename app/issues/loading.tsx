import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
