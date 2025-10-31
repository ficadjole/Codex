import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Uloga } from "../../../Domain/enums/Uloga";

interface JwtPayload {
  idKorisnika: number;
  username: string;
  uloga: Uloga;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Nedostaje token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ""
    ) as JwtPayload;

    req.user = decoded; // postavlja korisnika na req
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Nevažeći token" });
  }
};
