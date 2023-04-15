import React from "react";
import AccountLayout from "../../shared/layouts/account";
import Breadcrumb from "../../components/breadcrumb";

const Investment = () => {
    return (
        <AccountLayout>
            <Breadcrumb header="Investment" options={
                [
                    {
                        title: "Home",
                        path: "/dashboard",
                        link: true
                    },
                    {
                        title: "Account Management",
                        link: false
                    }
                ]
            } />

        </AccountLayout>
    );
};

export default Investment;
