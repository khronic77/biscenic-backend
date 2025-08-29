import { Request, Response, NextFunction } from "express";
import { UserRole } from "../interfaces/user.interfaces";

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = Array.isArray(req.user?.roles)
      ? req.user.roles
      : [req.user?.roles];

      if (!userRole || !Array.isArray(userRole)) {
      res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
      return;
    }

    if (!userRole.some((role) => allowedRoles.includes(role as UserRole))) {
      res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
      return;
    }

    next();
  };
};
