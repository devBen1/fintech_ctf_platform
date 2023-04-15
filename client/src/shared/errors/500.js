import React from "react";
import ErrorLayout from "../layouts/error";

const Error500 = () => {
    return (
        <ErrorLayout errorCode="500" errorTitle="Internal Server Error">
            The server encountered something unexpected that didn't allow it to complete the request. We apologize.<br />
            You can go back to main page:Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the refresh button on your browser or try found something else in our app.
        </ErrorLayout>
    );
};

export default Error500;
