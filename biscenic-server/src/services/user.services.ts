import User from "../models/user.model";
import { IUser, IUserDoc, UserRole } from "../interfaces/user.interfaces";
import bcrypt from "bcryptjs";

export class UserService {
  static async registerUser(userData: IUser): Promise<IUserDoc> {
    const { email, username, password, roles } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const userRoles: UserRole[] = ["user"];
    if (roles?.includes("admin")) {
      userRoles.push("admin");
    }

    const newUser = new User({
      email,
      username,
      password,
      roles: userRoles,
    });

    return await newUser.save();
  }

  static async loginUser(
    email: string,
    password: string
  ): Promise<{ token: string; user: IUserDoc }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValidPassword = await user.matchPassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    const token = user.getAuthToken();

    console.log("User roles:", user.roles);

    return { token, user };
  }
  static async deleteUser(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
  static async getAllUsers(): Promise<IUserDoc[]> {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    return users;
  }

  static async updateUserRole(userId: string, role: "user" | "admin", action: "add" | "remove"): Promise<IUserDoc | null> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (action === "add" && !user.roles.includes(role)) {
      user.roles.push(role);
    } else if (action === "remove") {
      user.roles = user.roles.filter(r => r !== role);
      if (user.roles.length === 0) {
        user.roles = ["user"];
      }
    }

    await user.save();
    return user;
  }
  static async updateProfile(userId: string, profileData: Partial<IUser>): Promise<IUserDoc | null> {
    const { firstName, lastName, phone, address } = profileData;
    
    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        address
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user;
  }
}
