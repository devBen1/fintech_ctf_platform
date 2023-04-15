import React, { useEffect } from "react";
import Logo from './../../assets/site_logo.png';

const AuthLayout = props => {
    const { children, headerDescription, headerText } = props;
    useEffect(() => {
        // document.body.style.backgroundColor = "#f3f3f4";
        document.body.classList.add('gray-bg');
    }, [])
    return (
        <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
                <div>
                    <h1 className="logo-name"><img width={350} height={220} src={Logo} alt="BFMFB" /></h1>
                </div>
                <h3>Welcome to Brighter Futures Microfinance Bank</h3>
                <p>
                    {headerDescription}
                </p>
                <p>{headerText}</p>
                {children}
                <p className="m-t">
                    <small>
                        All rights reserved &copy; 2023
                    </small>
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
