import mongoose, { Schema, Types, Document, model } from "mongoose";
import { IUserDoc } from "../interfaces/user.interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema<IUserDoc>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String }
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
    validate: {
      validator: (roles: string[]) => roles.length > 0,
      message: "User must have at least one role",
    },
  },
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getAuthToken = function(): string {
  return jwt.sign(
    { userId: this._id, roles: this.roles },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1h" }
  );
};

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model<IUserDoc>("User", userSchema);

export default User;
