//auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { UserRole, IUserDoc } from "../interfaces/user.interfaces";

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUserDoc;
    }
}

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "Authentication token is required" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
            userId: string;
            roles: UserRole[];
        };

        const user = await User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        // Assign the entire user document
        req.user = user;
        next();
    } catch (error: any) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
};

export const admin = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (!req.user) {
        res.status(401).json({
            message: 'Authentication required',
            error: true
        });
        return;
    }

    if (req.user.roles.includes('admin')) {
        next();
    } else {
        res.status(403).json({
            message: 'Access denied. Admin privileges required.',
            error: true
        });
    }
};
