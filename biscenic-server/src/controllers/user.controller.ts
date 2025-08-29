// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.services";
import * as AddressService from "../services/address.services";
import { IUserDoc } from "../interfaces/user.interfaces";

export class UserController {
  static getUserProfile(arg0: string, protect: (req: Request, res: Response, next: NextFunction) => Promise<void>, getUserProfile: any) {
    throw new Error("Method not implemented.");
  }
  static adminDashboard(arg0: string, protect: (req: Request, res: Response, next: NextFunction) => Promise<void>, admin: (req: Request, res: Response, next: NextFunction) => void, adminDashboard: any) {
    throw new Error("Method not implemented.");
  }
  static deleteUser(arg0: string, protect: (req: Request, res: Response, next: NextFunction) => Promise<void>, admin: (req: Request, res: Response, next: NextFunction) => void, deleteUser: any) {
    throw new Error("Method not implemented.");
  }
  /**
   * Register a new user and create a default shipping address
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   */
  static async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username, email, password, roles, shippingAddress } = req.body; // Add roles here

      // Validate required fields
      if (!username || !email || !password) {
        res
          .status(400)
          .json({ message: "Please provide username, email, and password" });
        return;
      }

      if (
        !shippingAddress?.street ||
        !shippingAddress?.city ||
        !shippingAddress?.state ||
        !shippingAddress?.country ||
        !shippingAddress?.zipCode ||
        !shippingAddress?.phoneNumber
      ) {
        res.status(400).json({
          message:
            "Please provide all required fields for the shipping address",
        });
        return;
      }

      const newUser = await UserService.registerUser({
        username,
        email,
        password,
        roles: roles || ["user"], 
      });

      try {
        const newAddress = await AddressService.addAddress({
          user: newUser._id.toString(),
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          country: shippingAddress.country,
          zipCode: shippingAddress.zipCode,
          phoneNumber: shippingAddress.phoneNumber,
          isDefault: true,
        });

        const { password: excludedPassword, ...userData } = newUser.toObject();

        res.status(201).json({
          message: "User registered successfully",
          data: {
            user: userData,
            defaultAddress: newAddress,
          },
          error: null,
        });
      } catch (addressError: any) {
        await UserService.deleteUser(newUser._id.toString());
        res.status(500).json({
          message: "Failed to create shipping address",
          error: addressError.message || "Unknown error occurred",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Registration failed",
        error: error.message || "Unknown error occurred",
      });
    }
  }

  /**
   * Login a user and return their token
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   */
  static async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate login credentials
      if (!email || !password) {
        res.status(400).json({ message: "Please provide email and password" });
        return;
      }

      const { token, user }: { token: string; user: IUserDoc } =
        await UserService.loginUser(email, password);

      res.status(200).json({
        message: "Logged in successfully",
        token,
        user: {
          userId: user._id.toString(),
          username: user.username,
          email: user.email,
          roles: user.roles,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }

static async getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
      error: null
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message
    });
  }
}

static async updateUserRole(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;
    const { role, action } = req.body;

    const updatedUser = await UserService.updateUserRole(userId, role, action);
    res.status(200).json({
      message: "User role updated successfully",
      data: updatedUser,
      success: true
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to update user role",
      error: error.message
    });
  }
}
}
