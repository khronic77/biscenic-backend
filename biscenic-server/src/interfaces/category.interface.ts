import mongoose from "mongoose";

export interface ICategory {
  name: string;
  description: string;
}

export interface ICategoryDoc extends mongoose.Document, ICategory {
  createdAt: Date;
  updatedAt: Date;
}
