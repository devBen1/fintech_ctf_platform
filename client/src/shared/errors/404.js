import React from "react";
import ErrorLayout from "../layouts/error";

const Error404 = () => {
    return (
        <ErrorLayout errorCode="404" errorTitle="Page Not Found">
            Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the refresh button on your browser or try found something else in our app.
        </ErrorLayout>
    );
};

export default Error404;
