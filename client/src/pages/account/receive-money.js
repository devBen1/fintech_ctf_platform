import React from "react";
import AccountLayout from "../../shared/layouts/account";
import Breadcrumb from "../../components/breadcrumb";

const ReceiveMoney = () => {
    return (
        <AccountLayout>
            <Breadcrumb header="Receive Money" options={
                [
                    {
                        title: "Home",
                        path: "/dashboard",
                        link: true
                    },
                    {
                        title: "Finance",
                        link: false
                    }
                ]
            } />

        </AccountLayout>
    );
};

export default ReceiveMoney;
