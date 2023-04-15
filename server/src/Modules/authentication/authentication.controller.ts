import { NextFunction, Request, Response } from "express";
import bcryptjs, { compareSync } from 'bcryptjs';
import jwt, { sign } from 'jsonwebtoken';
import AuthenticationService from './authentication.service';
import { handleError, handleSuccess } from '../../custom/functions/messageHandlers';

class AuthenticationController {
    constructor() { }

    async Login(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await AuthenticationService.GetUserInfo({ customerEmail: req.body.email });
            if (response === null) {
                return handleError(res, "Invalid Credentials", 400);
            }

            for (let i = 0; i <= response.accesscodes.length; i++) {
                if (i >= response.accesscodes.length) {
                    return handleError(res, "Invalid Credentials", 400);
                }
                const result = compareSync(req.body.password, response.accesscodes[i].passcode);
                if (result) {
                    // create JWTs
                    const accessToken = sign(
                        {
                            "UserInfo": {
                                "_id": response.customerUID,
                                "email": response.customerEmail,
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '10s' }
                    );
                    const refreshToken = sign(
                        { "email": response.customerEmail },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '5h' }
                    );

                    // Saving refreshToken with current user
                    await AuthenticationService.UpdateUser({ refreshToken }, response.customerUID);

                    delete response.accesscodes;

                    // Creates Secure Cookie with refresh token
                    res.cookie('jwt', refreshToken, {
                        httpOnly: true,
                        secure: true,
                        // signed: true,
                        // sameSite: 'None',
                        maxAge: 24 * 60 * 60 * 1000
                    });

                    const output = {
                        accessToken,
                        response
                    }

                    // Send authorization roles and access token to user
                    return handleSuccess(res, "Data retrieved successfully", output);
                }
            }
        } catch (err) {
            console.log(err);
            return handleError(res, "An error occurred", 400);
        }
    }

    async ForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            if (Object.keys(req.body).length == 1) {
                return handleSuccess(res, "A reset link will be sent to your address if it exist in our records.", {});
            } else {
                const final = req.body.final;
                const passcode = req.body.new_password;
                delete req.body.final;
                delete req.body.new_password;
                delete req.body.confirm_password;
                const response: any = await AuthenticationService.GetUserInfo(req.body);
                if (response === null) {
                    return handleError(res, "Your information doesn't match the records in our database", 400);
                }
                console.log(final)
                if (final == 1) {
                    await AuthenticationService.AddAccessCode({
                        customer: response.customerUID,
                        passcode: bcryptjs.hashSync(passcode, 10)
                    });

                    return handleSuccess(res, "Password Updated Successfully", null);
                } else {
                    return handleSuccess(res, "Your record exist in our database", response);
                }
            }
        } catch (error) {
            console.log(error)
            return handleError(res, "An error occurred", 400);
        }
    }

    async Logout(req: Request, res: Response, next: NextFunction) {
        try {
            const cookies = req.cookies;
            if (!cookies?.jwt) return handleError(res, null, 204); //No content
            const refreshToken = cookies.jwt;

            // Is refreshToken in db?
            const foundUser = await AuthenticationService.GetUserInfo({ refreshToken });
            if (!foundUser) {
                res.clearCookie('jwt', { httpOnly: true, signed: true, secure: true });
                return handleError(res, null, 204);
            }

            await AuthenticationService.UpdateUser({ refreshToken: "" }, foundUser._id);

            res.clearCookie('jwt', { httpOnly: true, signed: true, secure: true });
            return handleError(res, null, 204);
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }

    async RefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const cookies = req.cookies;
            if (!cookies?.jwt) return handleError(res, null, 401);
            const refreshToken = cookies.jwt;

            const foundUser = await AuthenticationService.GetUserInfo({ refreshToken });
            if (!foundUser) return handleError(res, null, 403); //Forbidden 
            // evaluate jwt 
            jwt.verify(
                refreshToken,
                "process.env.REFRESH_TOKEN_SECRET",
                (err: any, decoded: any) => {
                    if (err || foundUser._id !== decoded._id) return handleError(res, null, 403);
                    const accessToken = jwt.sign(
                        {
                            "UserInfo": {
                                "_id": foundUser.customerUID,
                                "email": decoded.email,
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '10s' }
                    );
                    return handleSuccess(res, "", { foundUser, accessToken, roles: ["GRANT_ALL_ACCESS"] });
                }
            );
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }
}

export default AuthenticationController;
