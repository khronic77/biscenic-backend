import mongoose from 'mongoose';

export interface IProductImage {
    url: string;
    publicId: string;
    isMain: boolean;
}

export interface IProductDoc extends mongoose.Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: mongoose.Schema.Types.ObjectId;
    images: IProductImage[];
    createdAt: Date;
    updatedAt: Date;
}