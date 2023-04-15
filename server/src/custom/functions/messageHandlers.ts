import { Response } from "express";

export const handleError = (res: Response, output: any, statusCode: number) => {
  return res.status(statusCode).json({
    statusCode,
    output,
  });
};

export const handleSuccess = (res: Response, message: string, output: any) => {
  return res.status(200).json({
    statusCode: 200,
    message,
    output,
  });
};
