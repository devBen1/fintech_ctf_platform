import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ErrorLayout = props => {
    const { errorCode, errorTitle, children } = props;
    useEffect(() => {
        // document.body.style.backgroundColor = "#f3f3f4";
        document.body.classList.add('gray-bg');
    }, [])
    return (
        <div className="middle-box text-center animated fadeInDown">
            <h1>{errorCode}</h1>
            <h3 className="font-bold">{errorTitle}</h3>
            <div className="error-desc">
                {children}
                <br />
                <Link to="/" className="btn btn-primary m-t">Home</Link>
            </div>
        </div>
    );
};

export default ErrorLayout;
