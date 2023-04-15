import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useAuth from './../../hooks/useAuth';
import AuthLayout from "./../../shared/layouts/auth";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../../service/axios";
import { toast } from "react-toastify";

const LoginPage = () => {
    const { setAuth } = useAuth();

    const [loading, setLoading] = useState(false);
    const [passToggle, setPassToggle] = useState(false);
    const [verfied, setVerifed] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalStatus, setModalStatus] = useState(true);
    const navigate = useNavigate();

    const toggleBtn = () => {
        setPassToggle((prevState) => !prevState);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const output = await axios.post(
                `/auth/login`,
                { email, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    credentials: 'include'
                })
            const result = output.data;
            const accessToken = result.output.accessToken;
            const userCreds = result.output.response;
            const roles = ["GRANT_ALL_ACCESS"];
            setAuth({ email, userCreds, roles, accessToken });
            localStorage.setItem("persist", true);
            navigate("/dashboard");
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
                const errormessage = 'Failed login';
                toast.error(errormessage, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
        setLoading(false)
        e.target.reset();
    };

    function onChange() {
        setVerifed(true);
    }

    const closeModal = (e) => {
        setModalStatus(false)
    }


    return (
        <div>
            {verfied ?
                <div class="modal inmodal" id="myModal2" tabindex="-1" role="dialog" aria-hidden="true" style={{ display: modalStatus ? "block" : "none" }}>
                    <div class="modal-dialog">
                        <div class="modal-content animated flipInY">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" onClick={closeModal}><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                <h4 class="modal-title">Claim your Price!</h4>
                                <small class="font-bold">IMPORTANT INFORMATION.</small>
                            </div>
                            <div class="modal-body">
                                <p><strong>{`Congratulations, your flag is CTF4BF{C4ptch4_S0lv3d}`}</strong></p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-dismiss="modal" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                ""}
            <AuthLayout
                headerDescription="We help you secure your finance and give you a seamless and wonderful banking experience with our 21st century features."
                headerText="Login in securely to access your account."
            >
                <form className="m-t" onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex form-group">
                        <input
                            type={passToggle ? "text" : "password"}
                            className="form-control"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            onClick={toggleBtn}
                            style={{
                                marginLeft: "-2.17rem",
                                marginTop: "0.2rem",
                                cursor: "pointer",
                                outline: "none !",
                                color: "#363062",
                                fontSize: "18px",
                            }}
                        >
                            <i role="button" className={passToggle ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                        </span>
                    </div>
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_STAGING_RECAPTCHA_KEY}
                        onChange={onChange}
                        style={{ maxWidth: "400px" }}
                    />
                    <div className={loading ? "spinner-border text-danger" : ""} role="status">
                        {loading ? <span className="sr-only">Loading...</span> : <button type="submit" disabled={!verfied} className="btn btn-primary block full-width m-b mt-3"> Login</button>}
                    </div>

                    <Link to="/reset">
                        <small>Forgot password?</small>
                    </Link>
                </form>
            </AuthLayout>
        </div>
    );
};

export default LoginPage;
