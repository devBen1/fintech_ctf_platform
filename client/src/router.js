import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from './components/spinner/Spinner';
import RequireAuth from './shared/auth/RequireAuth';
import PersistLogin from './shared/auth/PersistLogin';

const SignIn = lazy(() => import("./pages/auth/login"));
const ResetPassword = lazy(() => import("./pages/auth/reset"));

const Dashboard = lazy(() => import("./pages/account/dashboard"));
const SendMoney = lazy(() => import("./pages/account/send-money"));
const ReceiveMoney = lazy(() => import("./pages/account/receive-money"));
const Cards = lazy(() => import("./pages/account/cards"));
const Invest = lazy(() => import("./pages/account/investment"));
const Transactions = lazy(() => import("./pages/account/transactions"));

const AccessDenied = lazy(() => import("./shared/errors/accessdenied"));
const Error404 = lazy(() => import("./shared/errors/404"));
const Error500 = lazy(() => import("./shared/errors/500"));

const ROLES = {
    'CANDIDATE_PERMISSION': "GRANT_ALL_ACCESS"
}

const Routers = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="*" element={<Error404 />} />
                <Route path="/500" element={<Error500 />} />
                <Route path="/access/denied" element={<AccessDenied />} />

                {/* USERS */}
                <Route element={<PersistLogin />}>
                    <Route
                        element={
                            <RequireAuth allowedRoles={[ROLES.CANDIDATE_PERMISSION]} />
                        }
                    >
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/finance/send" element={<SendMoney />} />
                        <Route path="/finance/receive" element={<ReceiveMoney />} />

                        <Route path="/account/cards" element={<Cards />} />
                        <Route path="/account/invest" element={<Invest />} />

                        <Route path="/transactions" element={<Transactions />} />
                    </Route>
                </Route>

            </Routes>
        </Suspense>
    );
};

export default Routers;