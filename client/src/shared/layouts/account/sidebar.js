import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from './../../../assets/site_icon.png';
import useAuth from "./../../../hooks/useAuth";

const SideBar = () => {
    const { auth } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState("");
    const [openStatus, setOpenStatus] = useState(false);
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    
    const userinfo = auth.userCreds;

    const activateDropdown = async (path) => {
        setOpenStatus(!openStatus);
        setDropdownOpen(path);
    };

    const routeLinks = [
        {
            pathName: "Dashboard",
            pathLink: "dashboard",
            fontAwesomeIcon: "home",
            dropdown: false,
        },
        {
            pathName: "Finance",
            pathLink: "finance",
            fontAwesomeIcon: "money",
            dropdown: true,
            children: [
                {
                    pathName: "Send Money",
                    pathLink: "send",
                    fontAwesomeIcon: "send"
                },
                {
                    pathName: "Receive Money",
                    pathLink: "receive",
                    fontAwesomeIcon: "inbox"
                },
            ],
        },
        {
            pathName: "Account Management",
            pathLink: "account",
            fontAwesomeIcon: "th-large",
            dropdown: true,
            children: [
                {
                    pathName: "Cards",
                    pathLink: "cards",
                    fontAwesomeIcon: "credit-card"
                },
                {
                    pathName: "Investments",
                    pathLink: "invest",
                    fontAwesomeIcon: "diamond"
                },
            ]
        },
        {
            pathName: "Transaction History",
            pathLink: "transactions",
            fontAwesomeIcon: "history",
            dropdown: false,
        },
    ]

    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element text-center">
                            <img alt="user_image" className="rounded-circle" src={Logo} width={150} />
                            <span className="block m-t-xs font-bold">{userinfo.customerName}</span>
                            <span className="text-muted text-xs block"><small><i>Since 1986</i></small></span>
                        </div>
                        <div className="logo-element">
                            BFMFB
                        </div>
                    </li>
                    {routeLinks.map((link, index) => (
                        <li key={index} className={splitLocation[1] === link.pathLink ? "active" : ""}>
                            <Link to={!link.dropdown ? `/${link.pathLink}` : "#"} onClick={() => (activateDropdown(link.pathLink))}>
                                <i className={`fa fa-${link.fontAwesomeIcon}`}></i>
                                <span className="nav-label">{link.pathName}</span>
                                {link.dropdown ? <span className="fa arrow"></span> : ""}
                            </Link>
                            {link.dropdown ?
                                <>
                                    <ul className={dropdownOpen === link.pathLink && openStatus ? "nav nav-second-level" : "nav nav-second-level collapse"}>
                                        {link.children.map((childLink, childIndex) => (
                                            <li className={splitLocation[2] === childLink.pathLink ? "active" : ""} key={childIndex}>
                                                <Link to={`/${link.pathLink}/${childLink.pathLink}`}>
                                                    <i className={`fa fa-${childLink.fontAwesomeIcon}`}></i>
                                                    <span className="nav-label">{childLink.pathName}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                                : ""
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default SideBar;
