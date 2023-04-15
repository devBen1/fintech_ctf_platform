import React, { useState } from "react";
import { toast } from "react-toastify";
import AccountLayout from "../../shared/layouts/account";
import Card from './../../components/cards/index';
import FormGroup from './../../components/form-group/index';
import Button from './../../components/button/index';
import IBox from './../../components/ibox/index';
import Breadcrumb from './../../components/breadcrumb/index';
// import axios from "../../service/axios";
import useAuth from "./../../hooks/useAuth";

const SendMoney = () => {
    const { auth } = useAuth();
    const [accountName, setAccountName] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionPin, setPin] = useState('');
    const [modalStatus, setModalStatus] = useState(false);
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
            cardCol: "col-lg-4",
            cardStyle: "widget lazur-bg no-padding mt-5",
            cardBody: {
                amount: `$ ${userinfo.finances[1].balance}`,
                Header: "Account Balance",
                text: `Account Number (${userinfo.finances[1].accountType}): ${userinfo.finances[1].accountNo}`
            }
        }

    ];
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            if (transactionPin !== "" && accountName !== "" && accountNo !== "" && amount !== "") {
                if (transactionPin === userinfo.transactionPin) {
                    const response = "Funds transferred successfully";
                    toast.success(response, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setModalStatus(true)
                } else {
                    const response = "Invalid pin";
                    toast.error(response, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                const response = "Your values cannot be empty";
                toast.error(response, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (err) {
            const errormessage = 'An error occurred';
            toast.error(errormessage, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

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
                            <h4 class="modal-title">Claim your Price!</h4>
                            <small class="font-bold">IMPORTANT INFORMATION.</small>
                        </div>
                        <div class="modal-body">
                            <p><strong>{`Congratulations, your flag is CTF4BF{P1NCr4ck3d}`}</strong></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-white" data-dismiss="modal" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <AccountLayout>
                <Breadcrumb header="Send Money" options={
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

                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row d-flex justify-content-center flex-nowrap mb-3">
                        {accountInformation.map((item, index) => (
                            <Card
                                key={index}
                                cardCol={item.cardCol}
                                cardStyle={item.cardStyle}
                                cardBody={item.cardBody}
                            />
                        ))}
                    </div>
                    <div className="row d-flex justify-content-center flex-nowrap">
                        <div className="col-lg-6">
                            <IBox title="Transfer Money" header="Make Transfer">
                                <form id="payment-form" onSubmit={handleAdd}>
                                    <div className="row">
                                        <FormGroup type="select" colStyle="col-12" label="CHOOSE ACCOUNT"
                                            selectOptions={[
                                                `${userinfo.finances[0].accountNo} - ${userinfo.finances[0].accountType} (N ${userinfo.finances[0].balance})`,
                                                `${userinfo.finances[1].accountNo} - ${userinfo.finances[1].accountType} ($ ${userinfo.finances[1].balance})`
                                            ]}
                                        />
                                    </div>

                                    <div className="row">
                                        <FormGroup type="select" colStyle="col-12" label="RECEIVER'S BANK NAME"
                                            selectOptions={['Starling Bank', 'Standard Chartered Bank']}
                                            required="true"
                                        />
                                    </div>

                                    <div className="row">
                                        <FormGroup colStyle="col-7 col-md-7" label="RECEIVER ACCOUNT NAME"
                                            onChange={(e) => setAccountName(e.target.value)}
                                            inputOptions={{
                                                type: "text",
                                                placeholder: "Enter Receiver Account Name"
                                            }}
                                            required="true"
                                        />

                                        <FormGroup colStyle="col-5 col-md-5 float-right" label="RECEIVER ACCOUNT NUMBER"
                                            onChange={(e) => setAccountNo(e.target.value)}
                                            inputOptions={{
                                                type: "text",
                                                placeholder: "Enter Receiver Account Number"
                                            }}
                                            required="true"
                                        />
                                    </div>
                                    <div className="row">
                                        <FormGroup colStyle="col-7 col-md-7" label="AMOUNT"
                                            onChange={(e) => setAmount(e.target.value)}
                                            inputOptions={{
                                                type: "text",
                                                placeholder: "Enter Amount"
                                            }}
                                            required="true"
                                        />

                                        <FormGroup colStyle="col-5 col-md-5 float-right" label="TRANSACTION PIN"
                                            onChange={(e) => setPin(e.target.value)}
                                            inputOptions={{
                                                type: "text",
                                                placeholder: "Enter Transaction Pin"
                                            }}
                                            required="true"
                                        />
                                    </div>
                                    <div className="row float-right">
                                        <Button colStyle="col-12" text="Transfer Cash" buttonStyle="btn btn-primary" />
                                    </div>
                                </form>
                            </IBox>
                        </div >
                    </div >
                </div>
            </AccountLayout>
        </div>
    );
};

export default SendMoney;
