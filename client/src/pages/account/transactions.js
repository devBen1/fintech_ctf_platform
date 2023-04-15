import React from "react";
import AccountLayout from "../../shared/layouts/account";
import Datatable from './../../components/tables/index';
import Breadcrumb from "../../components/breadcrumb";

const TransactionHistory = () => {
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const tableHeader = [
        {
            label: "Reference",
            identifier: "transactionId",
            type: Number
        },
        {
            label: "Type",
            identifier: "type"
        },
        {
            label: "Details",
            identifier: "details"
        },
        {
            label: "Comment",
            identifier: "comment"
        },
        {
            label: "Amount",
            identifier: "amount"
        },
        {
            label: "Date",
            identifier: "date"
        }
    ];
    const TransactionHistory = [
        {
            transactionId: makeid(8),
            type: "Transfer",
            details: "Debit transaction from naira account to Mark Kassim - United Bank of Africa (5789203458)",
            comment: "Payment for hackathon flag creation",
            amount: "N20,000.00",
            date: "01-03-2023 9:00:58"
        },
        {
            transactionId: makeid(8),
            type: "Deposit",
            details: "Credit transaction to naira account from self",
            comment: "",
            amount: "N500,000.00",
            date: "18-02-2023 10:16:02"
        },
        {
            transactionId: makeid(8),
            type: "Withdrawal",
            details: "Debit transaction from naira account",
            comment: "Bank withdrawal",
            amount: "N200,000.00",
            date: "24-01-2023 20:22:16"
        },
        {
            transactionId: makeid(8),
            type: "Deposit",
            details: "Credit transaction to dollar account from self",
            comment: "CTF Initial deposit repayment",
            amount: "$35.00",
            date: "16-01-2023 12:00:03"
        },
        {
            transactionId: makeid(8),
            type: "Transfer",
            details: "Debit transaction from dollar account to Kim Bullock - Starling Bank (6301248790)",
            comment: "",
            amount: "$500.00",
            date: "25-12-2022 14:55:58"
        },
        {
            transactionId: makeid(8),
            type: "Transfer",
            details: "Debit transaction from naira account to David Makaleke - Stanbic Bank (2016790124)",
            comment: "",
            amount: "N50,000.00",
            date: "25-12-2022 14:53:24"
        },
        {
            transactionId: makeid(8),
            type: "Deposit",
            details: "Credit transaction to naira account from John Doe",
            comment: "Cashback Profit for November",
            amount: "N65,000.00",
            date: "22-12-2022 15:04:35"
        },
        {
            transactionId: makeid(8),
            type: "Withdrawal",
            details: "Debit transaction from naira account",
            comment: "",
            amount: "N89,500.52",
            date: "12-12-2022 10:29:48"
        },
        {
            transactionId: makeid(8),
            type: "Deposit",
            details: "Credit transaction to dollar account from Paul Maxwell",
            comment: "",
            amount: "$10,000.00",
            date: "08-12-2022 09:57:02"
        },
        {
            transactionId: makeid(8),
            type: "Deposit",
            details: "Credit transaction to naira account from Peter Jones",
            comment: "Balance payment for tutoring",
            amount: "N286,000.00",
            date: "27-11-2022 14:13:58"
        },
    ];
    return (
        <AccountLayout>
            <Breadcrumb header="Transaction History" options={
                [
                    {
                        title: "Home",
                        path: "/dashboard",
                        link: true
                    }
                ]
            } />

            <Datatable data={TransactionHistory} tableHeader={tableHeader} tableName="Transaction History" />
        </AccountLayout >
    );
};

export default TransactionHistory;
