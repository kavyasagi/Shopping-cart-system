import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
  
  } from "reactstrap";
const FormCard = ({
  header = "header",
  classHeader = "rounded shadow-sm text-center text-light",
  className = "shadow rounded m-auto w-50 border border-1 border-dark p-3",
  children,
}) => {
  return (
    <div>
      <Card className={className} style={{ backgroundColor: "#F4FCD9" }}>
        <CardHeader tag="h5" className={classHeader}    style={{ backgroundColor: "#BB9981" }}>
          {header}
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
};

export default FormCard;
