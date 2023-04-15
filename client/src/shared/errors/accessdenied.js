import React from "react";
import ErrorLayout from "../layouts/error";

const AccessDenied = () => {
    return (
        <ErrorLayout errorCode="1020" errorTitle="Access Denied">
            You do not have the priviledge to view this page. Return back
        </ErrorLayout>
    );
};

export default AccessDenied;
