import React, { useState } from "react";
import AccountLayout from "../../shared/layouts/account";
import Datatable from './../../components/tables/index';
import Card from './../../components/cards/index';
import useAuth from "./../../hooks/useAuth";

const DashboardPage = () => {
  const { auth } = useAuth();
  const [modalStatus, setModalStatus] = useState(true);
  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
      details:
        "Debit transaction from naira account to Mark Kassim - United Bank of Africa (5789203458)",
      comment: "Payment for hackathon flag creation",
      amount: "N20,000.00",
      date: "01-03-2023 9:00:58",
    },
    {
      transactionId: makeid(8),
      type: "Deposit",
      details: "Credit transaction to naira account from self",
      comment: "",
      amount: "N500,000.00",
      date: "18-02-2023 10:16:02",
    },
    {
      transactionId: makeid(8),
      type: "Withdrawal",
      details: "Debit transaction from naira account",
      comment: "Bank withdrawal",
      amount: "N200,000.00",
      date: "24-01-2023 20:22:16",
    },
    {
      transactionId: makeid(8),
      type: "Deposit",
      details: "Credit transaction to dollar account from self",
      comment: "CTF Initial deposit repayment",
      amount: "$35.00",
      date: "16-01-2023 12:00:03",
    },
    {
      transactionId: makeid(8),
      type: "Transfer",
      details:
        "Debit transaction from dollar account to Kim Bullock - Starling Bank (6301248790)",
      comment: "",
      amount: "$500.00",
      date: "25-12-2022 14:55:58",
    },
    {
      transactionId: makeid(8),
      type: "Transfer",
      details:
        "Debit transaction from naira account to David Makaleke - Stanbic Bank (2016790124)",
      comment: "",
      amount: "N50,000.00",
      date: "25-12-2022 14:53:24",
    },
    {
      transactionId: makeid(8),
      type: "Deposit",
      details: "Credit transaction to naira account from John Doe",
      comment: "Cashback Profit for November",
      amount: "N65,000.00",
      date: "22-12-2022 15:04:35",
    },
    {
      transactionId: makeid(8),
      type: "Withdrawal",
      details: "Debit transaction from naira account",
      comment: "",
      amount: "N89,500.52",
      date: "12-12-2022 10:29:48",
    },
    {
      transactionId: makeid(8),
      type: "Deposit",
      details: "Credit transaction to dollar account from Paul Maxwell",
      comment: "",
      amount: "$10,000.00",
      date: "08-12-2022 09:57:02",
    },
    {
      transactionId: makeid(8),
      type: "Deposit",
      details: "Credit transaction to naira account from Peter Jones",
      comment: "Balance payment for tutoring",
      amount: "N286,000.00",
      date: "27-11-2022 14:13:58",
    },
  ];
  const userinfo = auth.userCreds;

  const accountInformation = [
    {

      cardCol: "col-lg-5",
      cardStyle: "widget navy-bg no-padding mt-5",
      cardBody: {
        amount: `N ${userinfo.finances[0].balance}`,
        Header: "Account Balance",
        text: `Account Number (${userinfo.finances[0].accountType}): ${userinfo.finances[0].accountNo}`
      }
    },
    {
      cardCol: "col-lg-3",
      cardStyle: "widget lazur-bg no-padding mt-5",
      cardBody: {
        amount: `$ ${userinfo.finances[1].balance}`,
        Header: "Account Balance",
        text: `Account Number (${userinfo.finances[1].accountType}): ${userinfo.finances[1].accountNo}`
      }
    }

  ];

  const closeModal = (e) => {
    setModalStatus(false)
  }

  return (
    <div>
      <div class="modal inmodal" id="myModal2" tabindex="-1" role="dialog" aria-hidden="true" style={{ display: modalStatus ? "block" : "none" }}>
        <div class="modal-dialog">
          <div class="modal-content animated flipInY">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" onClick={closeModal}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">Welcome to your account!</h4>
              <small class="font-bold">IMPORTANT INFORMATION.</small>
            </div>
            <div class="modal-body">
              <p><strong>{`Congratulations, your flag is CTF4BF{w3lc0m3_2_da_b4nk}`}</strong></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-white" data-dismiss="modal" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <AccountLayout>
        <div className="row  border-bottom white-bg dashboard-header">
          <div className="col-md-4">
            <h2>Hello {userinfo.customerName.replace(/ .*/, '')}!</h2>
            <small>Welcome back to your account.</small>

            <ul className="list-group clear-list m-t">
              <li className="list-group-item fist-item">
                <span className="float-right">
                  01<sup>st</sup> Mar. 2023 - 09:00 pm
                </span>
                <span className="label label-success">1</span> Request Account
                Statement
              </li>
              <li className="list-group-item">
                <span className="float-right">
                  25<sup>th</sup> Feb. 2023 - 10:16 am
                </span>
                <span className="label label-info">2</span> Transferred N20,000 to
                Mark
              </li>
              <li className="list-group-item">
                <span className="float-right">
                  18<sup>th</sup> Feb. 2023 - 08:22 pm
                </span>
                <span className="label label-primary">3</span> Deposited N500,000
                from self
              </li>
              <li className="list-group-item">
                <span className="float-right">
                  24<sup>th</sup> Jan. 2023 - 11:06 pm
                </span>
                <span className="label label-default">4</span> Withdraw N200,000
              </li>
              <li className="list-group-item">
                <span className="float-right">
                  16<sup>th</sup> Jan. 2023 - 12:00 am
                </span>
                <span className="label label-primary">5</span> Deposited $35
              </li>
            </ul>
          </div>

          {accountInformation.map((item, index) => (
            <Card
              key={index}
              cardCol={item.cardCol}
              cardStyle={item.cardStyle}
              cardBody={item.cardBody}
            />
          ))}

        </div>
        <Datatable data={TransactionHistory} tableHeader={tableHeader} tableName="Recent Transactions" />
      </AccountLayout>
    </div>
  );
};

export default DashboardPage;
