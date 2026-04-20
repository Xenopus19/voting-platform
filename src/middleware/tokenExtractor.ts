import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  decodedToken?: any;
}

const tokenExtractor = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
    } catch {
      console.log("Invalid token");
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

export default tokenExtractor;