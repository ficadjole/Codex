import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../../Domain/enums/UserRole";

export const authorize = (...dozvoljeneUloge: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user || !dozvoljeneUloge.includes(user.userRole)) {
      res.status(403).json({ success: false, message: "Access denied" });
      return;
    }

    next();
  };
};
