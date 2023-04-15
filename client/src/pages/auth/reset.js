import React, { useState } from "react";
// import { Link } from "react-router-dom";
import AuthLayout from "./../../shared/layouts/auth";
import axios from "../../service/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ResetPage = () => {
    const [email, setEmail] = useState('');
    const [inputSet, setInput] = useState('');
    const [storeResponse, setStoreResponse] = useState(0);
    const [storeBotResponse, setStoreBotResponse] = useState(1);
    const [resArr, setResArr] = useState([]);
    const [storeChatHistory, setStoreChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [selectOption, setSelectOption] = useState(true);
    const [modalStatus, setModalStatus] = useState(true);
    const [flagReveal, setFlagReveal] = useState(false);
    const navigate = useNavigate();

    const chatSequence = [
        {
            id: "bot-0",
            message: "Oops you forgot your password, would you like to change your password?"
        },
        {
            id: "bot-1",
            message: "Kindly provide your email address"
        },
        {
            id: "bot-2",
            message: "Kindly provide your First Name"
        },
        {
            id: "bot-3",
            message: "Kindly provide your Last Name"
        },
        {
            id: "bot-4",
            message: "Congratulation the information provided are valid. Enter a new password"
        },
        {
            id: "bot-5",
            message: "Re-enter the Password"
        }
    ];

    const getUserInfo = async (e) => {
        try {
            e.preventDefault();
            if (storeResponse === 2 || storeResponse === 4) {
                try {
                    const output = await axios.put(
                        `/auth/reset/password`,
                        storeResponse === 2 ? {
                            customerName: resArr[1] + " " + inputSet,
                            customerEmail: resArr[0],
                            final: 0
                        } : {
                            customerName: resArr[1] + " " + resArr[2],
                            customerEmail: resArr[0],
                            new_password: resArr[3],
                            confirm_password: inputSet,
                            final: 1
                        },
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true,
                            credentials: 'include'
                        })
                    const response = output.data;
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    if (storeResponse === 4) {
                        setModalStatus(true)
                        setFlagReveal(true)
                    }

                    if (storeResponse < 4) {
                        setStoreBotResponse(storeBotResponse + 1)
                        setStoreChatHistory([...storeChatHistory, [chatSequence[storeBotResponse].message, inputSet]])
                        setStoreResponse(storeResponse + 1)
                        setResArr([...resArr, inputSet])
                    }
                } catch (err) {
                    if (!err?.response) {
                        const errormessage = 'An error occurred';
                        toast.error(errormessage, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    } else if (err.response?.status === 400 || err.response?.status === 401) {
                        const errormessage = err.response.data.output;
                        toast.error(errormessage, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    } else if (err.response?.status === 403) {
                        const failedMessage = err.response.data.output;
                        failedMessage.map((i) =>
                            toast.error(i.msg, {
                                position: toast.POSITION.TOP_RIGHT,
                            })
                        );
                    } else {
                        const errormessage = 'Failed Action';
                        toast.error(errormessage, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                }
            } else {
                if (storeResponse === 3) {
                    const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
                    if (inputSet.match(regularExpression)) {
                        setResArr([...resArr, inputSet])

                        setStoreBotResponse(storeBotResponse + 1)
                        setStoreChatHistory([...storeChatHistory, [chatSequence[storeBotResponse].message, inputSet]])
                        setStoreResponse(storeResponse + 1)
                    } else {
                        const errormessage = 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long';
                        toast.error(errormessage, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                } else {
                    setResArr([...resArr, inputSet])

                    setStoreBotResponse(storeBotResponse + 1)
                    setStoreChatHistory([...storeChatHistory, [chatSequence[storeBotResponse].message, inputSet]])
                    setStoreResponse(storeResponse + 1)
                }
            }
            setInput("");
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const output = await axios.put(
                `/auth/forgot-password`,
                { email },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    credentials: 'include'
                })
            const response = output.data;
            toast.success(response.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        } catch (err) {
            if (!err?.response) {
                const errormessage = 'An error occurred';
                toast.error(errormessage, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else if (err.response?.status === 400 || err.response?.status === 401) {
                const errormessage = err.response.data.output;
                toast.error(errormessage, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else if (err.response?.status === 403) {
                const failedMessage = err.response.data.output;
                failedMessage.map((i) =>
                    toast.error(i.msg, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                );
            } else {
                const errormessage = 'Failed Action';
                toast.error(errormessage, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
        setLoading(false)
        e.target.reset();
    };

    const showDialogAction = (e) => {
        setShowDialog(showDialog ? false : true);
    }

    const closeModal = (e) => {
        setModalStatus(false)
    }

    const optionCheck = (value) => {
        if (selectOption) {
            if (value === 1) {
                setStoreBotResponse(storeBotResponse + 1)
                setStoreChatHistory([...storeChatHistory, [chatSequence[storeBotResponse].message, "Yes"]])
            } else {
                navigate("/");
            }
        } else {
            const errormessage = 'You have already selected an option';
            toast.error(errormessage, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        setSelectOption(undefined)
    }

    return (
        <div>
            <div class="modal inmodal" id="myModal2" tabindex="-1" role="dialog" aria-hidden="true" style={{ display: modalStatus ? "block" : "none" }}>
                <div class="modal-dialog">
                    <div class="modal-content animated flipInY">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" onClick={closeModal}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title">{flagReveal ? "Claim your Price!" : "Reset your password!"}</h4>
                            <small class="font-bold">IMPORTANT INFORMATION.</small>
                        </div>
                        <div class="modal-body">
                            <p><strong>{flagReveal ? "Congratulations, your flag is CTF4BF{9455w0rd_r3537}" : "Reset your password using either the form or the chat bot at the bottom right corner"}</strong></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-white" data-dismiss="modal" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <AuthLayout
                headerDescription="Continue with your account today by reseting your password. All you have to do is enter your email address."
                headerText="Reset your passcode today!"
            >
                <form className="m-t" onSubmit={handleReset}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="" role="status">
                        <button type="submit" disabled={email === "" ? true : false} className={"block full-width m-b btn" + (loading ? " btn-default" : " btn-primary")}>
                            {loading ? <div className="sk-spinner sk-spinner-fading-circle">
                                <div className="sk-circle1 sk-circle"></div>
                                <div className="sk-circle2 sk-circle"></div>
                                <div className="sk-circle3 sk-circle"></div>
                                <div className="sk-circle4 sk-circle"></div>
                                <div className="sk-circle5 sk-circle"></div>
                                <div className="sk-circle6 sk-circle"></div>
                                <div className="sk-circle7 sk-circle"></div>
                                <div className="sk-circle8 sk-circle"></div>
                                <div className="sk-circle9 sk-circle"></div>
                                <div className="sk-circle10 sk-circle"></div>
                                <div className="sk-circle11 sk-circle"></div>
                                <div className="sk-circle12 sk-circle"></div>
                            </div>
                                : "Reset Password"}
                        </button>
                    </div>

                    <small>
                        Have an Account? <a href="/"> Login</a>
                    </small>
                </form>
            </AuthLayout>

            <div className={"small-chat-box fadeInRight animated" + (!showDialog ? "" : " active")} style={{ width: "530px", height: "630px" }}>

                <div className="heading" draggable="true">
                    <small className="chat-date float-right">
                        Online <span style={{
                            backgroundColor: "#90ee90", borderRadius: "50%", height: "6px", width: "6px", display: "inline-block"
                        }}></span>
                    </small>
                    Welcom to Brighter Futures
                </div>
                <div className="slimScrollDiv" style={{ position: "relative", overflow: "scroll", width: "auto", height: "544px" }}>
                    <div className="content" style={{ overflow: "scroll", width: "auto", height: "544px" }}>
                        <div className="left">
                            <div className="author-name">
                                Help Bot <small className="chat-date">
                                    03/2023
                                </small>
                            </div>
                            <div className="chat-message active">
                                {chatSequence[0].message}
                            </div>
                        </div>
                        <div className="rows">
                            <div className="d-flex col-12" style={{ marginLeft: "3%" }}>
                                <div className="col-3 text-center mt-3 pt-2 ml-5" style={{ backgroundColor: "grey", color: "white", borderRadius: "10%", cursor: "pointer" }} onClick={() => optionCheck(1)}>
                                    Yes
                                </div>
                                <div className="col-3 text-center mt-3 ml-3 pt-2" style={{ backgroundColor: "grey", color: "white", borderRadius: "10%", cursor: "pointer" }} onClick={() => optionCheck(0)}>
                                    No
                                </div>
                            </div>
                        </div>
                        {storeChatHistory.map(history => (
                            <><div className="right">
                                <div className="author-name">
                                    {resArr.length === 2 ? resArr[1] : resArr.length >= 3 ? resArr[1] + " " + resArr[2] : "User"}
                                    <small className="chat-date">
                                        03/2023
                                    </small>
                                </div>
                                <div className="chat-message">
                                    {history[1]}
                                </div>
                            </div>

                                <div className="left">
                                    <div className="author-name">
                                        Help Bot <small className="chat-date">
                                            03/2023
                                        </small>
                                    </div>
                                    <div className="chat-message active">
                                        {history[0]}
                                    </div>
                                </div></>
                        ))}


                    </div>
                </div>
                {storeChatHistory.length > 0 ?
                    <div className="form-chat">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control"
                                onChange={handleChange}
                                value={inputSet}
                            />
                            <span className="input-group-btn"> <button
                                className="btn btn-primary" onClick={getUserInfo} type="button">Send
                            </button> </span></div>
                    </div>
                    : ""}

            </div>
            <div id="small-chat">

                <span className="badge badge-warning float-right">Need Help?</span>
                <span className="open-small-chat" onClick={showDialogAction} style={{ cursor: "pointer" }}>
                    {!showDialog ?
                        <i className="fa fa-comments"></i>
                        :

                        <i className="fa fa-times"></i>
                    }
                </span>
            </div>
        </div>
    );
};

export default ResetPage;
