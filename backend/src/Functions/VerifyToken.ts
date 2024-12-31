import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import RequestWithUserRole from "../types/user";

export const verifyToken = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    const jsonTokenSecretKey = process.env.JWT_SECRET;
    if (!jsonTokenSecretKey) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    jwt.verify(bearerToken, jsonTokenSecretKey, (err: any, authData: any) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.userid = authData.id;
        next();
      }
    });
  
  } else {
    res.sendStatus(403);
  }
};
