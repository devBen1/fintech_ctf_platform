import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import { handleError } from '../custom/functions/messageHandlers';

class ValidatorMiddleware {
    async validateInputs(req: Request, res: Response, next: NextFunction) {
        try {
            let arrayReq: Array<any> = [];
            const obj = req.body;
            Object.keys(obj).map((objKey, index) => {
                if (objKey == "email") {
                    arrayReq.push(body("email", "Invalid Email.").trim().escape().isEmail().run(req));
                } else if (objKey == "new_password") {
                    arrayReq.push(body("new_password", 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i").trim().escape().run(req));
                    arrayReq.push(body("confirm_password", 'Passwords do not match').equals(req.body.new_password).run(req));
                } else {
                    arrayReq.push(body(objKey, `Invalid ${objKey.toUpperCase()}`).trim().escape().run(req));
                }
            });
            await Promise.all(arrayReq);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return handleError(res, errors.array(), 403);
            }
            return next();
        } catch {
            return handleError(res, "Error in your data", 400);
        }
    }


    async checkIfPresent(arrayList: Array<string>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let arrayReq: Array<any> = [];
                arrayList.map((arr, index) => {
                    if (!(arr in req.body)) {
                        arrayReq.push(body(arr, `Invalid ${arr.toUpperCase()}`).notEmpty().run(req));
                    }
                });
                await Promise.all(arrayReq);
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return handleError(res, errors.array(), 403);
                }
                return next();
            } catch {
                return handleError(res, "Error in your data", 400);
            }
        }
    }
}

export default ValidatorMiddleware;