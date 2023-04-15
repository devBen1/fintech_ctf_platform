import { NextFunction, Request, Response } from "express";
import { handleError, handleSuccess } from '../../custom/functions/messageHandlers';
import AuthenticationService from './../authentication/authentication.service';

class AppointmentController {
    constructor() { }

    async SendMoney(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.transactionPin === res.locals.isUserExist.transactionPin) {
                return handleSuccess(res, "Transfer Successful", 200);
            } else {
                return handleError(res, "Invalid pin. Try again!", 400);
            }
        } catch {
            return handleError(res, "An error occurred", 400);
        }
    }
}

export default AppointmentController;
