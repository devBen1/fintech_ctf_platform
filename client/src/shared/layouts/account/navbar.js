import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogout from "./../../../hooks/useLogout";

const NavBar = () => {
    const [openStatus, setOpenStatus] = useState(false);

    const logout = useLogout();

    const signout = async () => {
        await logout();
    };

    const openMiniMenu = async () => {
        setOpenStatus(!openStatus);
        if (!openStatus) {
            document.body.classList.add('body-small','mini-navbar');
        } else {
            document.body.classList.remove('body-small','mini-navbar');
        }
    };
    
    useEffect(() => {
        setOpenStatus(false);
        document.body.classList.remove('body-small', 'mini-navbar');
    }, [])
    return (
        <div className="row border-bottom" >
            <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: "0" }}>
                <div className="navbar-header">
                    <Link className="navbar-minimalize minimalize-styl-2 btn btn-primary" to="#" onClick={() => (openMiniMenu())}><i className="fa fa-bars"></i> </Link>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li style={{ padding: "20px" }}>
                        <span className="m-r-sm text-muted welcome-message">Welcome to Brighter Future CTF Microfinance Bank</span>
                    </li>


                    <li>
                        <Link to onClick={signout}>
                            <i className="fa fa-sign-out"></i> Log out
                        </Link>
                    </li>
                </ul>

            </nav>
        </div>
    );
};

export default NavBar;
