import { Request, Response, NextFunction } from "express";
import { Uloga } from "../../../Domain/enums/Uloga";

export const authorize = (...dozvoljeneUloge: Uloga[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const korisnik = req.user;

    if (!korisnik || !dozvoljeneUloge.includes(korisnik.uloga)) {
      res.status(403).json({ success: false, message: "Zabranjen pristup" });
      return;
    }

    next();
  };
};
