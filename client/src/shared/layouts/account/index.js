import React, { useEffect } from "react";
import SideBar from "./sidebar";
import NavBar from "./navbar";
import Footer from "./footer";
// import useImportScript from '../../../hooks/useImportScript';


const AccountLayout = props => {
    const { children } = props;
    // useImportScript("../../../assets/js/jquery-3.1.1.min.js");
    useEffect(() => {
        // document.body.style.backgroundColor = "#2f4050";
        // document.body.style.color = "#676a6c";
        document.body.classList.remove('gray-bg');
    }, [])
    return (
        <div id="wrapper">
            <SideBar />
            <div id="page-wrapper" className="gray-bg dashbard-1">
                <NavBar />
                {children}
                <Footer />
            </div>
        </div>
    );
};

export default AccountLayout;
