import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import AccountLayout from "../../shared/layouts/account";
import Breadcrumb from "../../components/breadcrumb";
import useAuth from "./../../hooks/useAuth";

const CardPage = () => {
    const { auth } = useAuth();
    const userinfo = auth.userCreds;
    const [viewCardInfo, setCardInfo] = useState(false);
    const [seenHistory, setSeenHistory] = useState(false);
    useEffect(() => {
        const checkView = localStorage.getItem("view_card")
        if (checkView || checkView === 1) {
            setSeenHistory(true)
        }
    }, []);

    const CardInfo = [
        {
            icon: "fa fa-cc-mastercard payment-icon-big text-warning",
            cardNumber: "5399 8545 4496 4899",
            expirationDate: "12/26",
            nameOnCard: userinfo.customerName,
            active: true,
        },
        {
            icon: "fa fa-cc-visa payment-icon-big text-success",
            cardNumber: "",
            expirationDate: "11/20",
            nameOnCard: userinfo.customerName,
            active: false,
        },
        {
            icon: "fa fa-cc-discover payment-icon-big text-danger",
            cardNumber: "",
            expirationDate: "10/16",
            nameOnCard: userinfo.customerName,
            active: false,
        },
    ];

    const handleAdd = async (e) => {
        e.preventDefault();
        const errormessage = "Invalid Transaction Token";
        toast.error(errormessage, {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    const viewCardNo = async (e) => {
        e.preventDefault();
        const errormessage = "Details will expire shortly";
        toast.warn(errormessage, {
            position: toast.POSITION.TOP_RIGHT,
        });
        setCardInfo(true)
        setTimeout(() => {
            setSeenHistory(true)
            localStorage.setItem("view_card", 1);
            setCardInfo(false);
        }, 10000)
    };

    return (
        <AccountLayout>
            <Breadcrumb header="Payment Cards" options={
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

            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    {CardInfo.map((card, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="payment-card">
                                {
                                    seenHistory === false && card.active === true ? 
                                            <div style={{ position: "absolute", right: "8px", top: "-5px", zIndex: "1", overflow: "hidden", width: "75px", height: "75px", textAlign: "right" }}>
                                            <span style={{ fontSize: "10px", fontWeight: "bold", color: "#FFF", textTransform: "uppercase", textAlign: "center", lineHeight: "20px", transform: "rotate(45deg)", width: "100px", display: "block", background: "#79A70A", background: "linear-gradient(#9BC90D 0%, #79A70A 100%)", boxShadow: "0 3px 10px -5px rgba(0, 0, 0, 1)", position: "absolute", top: "19px", right: "-21px" }}>
                                                View Once
                                            </span>
                                        </div>
                                    : ""
                                }
                                <span className={seenHistory === false && card.active === true ? "float-right mr-5" : "float-right"}>
                                    <i role="button" className="fa fa-info-circle mr-2" title={card.active === false ? "This card is expired" : "Card is active"}></i>
                                    <button style={{ padding: "0", border: "none", background: "none", cursor: "pointer" }} title="Delete card from account"><i className="fa fa-trash"></i></button>
                                </span>

                                <i className={card.icon}></i>
                                <h2>

                                    {
                                        seenHistory === false && card.active === true ? <span className="float-right" title="You can view this only once" style={{ cursor: "pointer" }} onClick={viewCardNo}>
                                            <i role="button" className="fa fa-eye"></i>
                                        </span>
                                            : ""
                                    }
                                    {viewCardInfo === true && card.active === true ? card.cardNumber : "**** **** **** ****"}
                                </h2>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <small>
                                            <strong>Expiry date:</strong> {card.expirationDate}
                                        </small>
                                    </div>
                                    <div className="col-sm-6 text-right">
                                        <small>
                                            <strong>Name:</strong> {card.nameOnCard}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox">
                            <div className="ibox-title">Card Management</div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3 className="mb-3">Link another bank card</h3>
                                        <form id="payment-form" onSubmit={handleAdd}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>CARD NUMBER</label>
                                                        <div className="input-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Valid Card Number"
                                                                required
                                                            />
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-credit-card"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-7 col-md-7">
                                                    <div className="form-group">
                                                        <label>EXPIRATION DATE</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="MM / YY"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-5 col-md-5 float-right">
                                                    <div className="form-group">
                                                        <label>CV CODE</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="CVC"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>NAME OF CARD</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="NAME AND SURNAME"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>TRANSACTION TOKEN</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Transaction Token"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <button className="btn btn-primary" type="submit">
                                                        Register Card
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-6">
                                        <h3 className="mb-3">
                                            <span className="float-right">
                                                <i role="button" className="fa fa-info-circle" title="You will be charged a processing fee for this action"></i>
                                            </span>
                                            Apply for a new card
                                        </h3>
                                        <form id="payment-form" onSubmit={handleAdd}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>CARD TYPE</label>
                                                        <div className="input-group">
                                                            <select className="form-control m-b">
                                                                <option>Mastercard</option>
                                                                <option>Verve</option>
                                                                <option>Visa</option>
                                                                <option>Discover</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-7 col-md-7">
                                                    <div className="form-group">
                                                        <label>PCIKUP STATE</label>
                                                        <select className="form-control m-b">
                                                            <option>Abia</option>
                                                            <option>Delta</option>
                                                            <option>Edo</option>
                                                            <option>Lagos</option>
                                                            <option>FCT</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-5 col-md-5 float-right">
                                                    <div className="form-group">
                                                        <label>PICKUP BRANCH</label>
                                                        <select className="form-control m-b">
                                                            <option>Home</option>
                                                            <option>Branch</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>REASON FOR CARD APPLICATION</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Why are you applying for a new card?"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label>TRANSACTION TOKEN</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Transaction Token"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <button className="btn btn-primary">
                                                        Apply for a new card
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
};

export default CardPage;
