import mongoose from "mongoose";

export type UserRole = "admin" | "user" | "seller"; 

export interface IUser {
  email: string;
  username: string;
  password: string;
  avatar?: string;
  slug?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  roles?: UserRole[]; 
}

export interface IUserDoc extends IUser, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  roles: UserRole[];
  matchPassword(password: string): Promise<boolean>;
  getAuthToken(): string;
}
