import {Schema} from 'mongoose';
import {
  ProductCategoryEntity, ProductEntity, ProductReviewEntity,
} from '../interfaces/ProductInterfaces';
import {ObjectId} from 'mongodb';

export const ProductCategorySchema = new Schema<ProductCategoryEntity>({
  description: String,
  name: String,
  deleted: {type: Boolean, select: false},
  __v: {type: Number, select: false},
  createdAt: {type: String, select: false},
  updatedAt: {type: String, select: false},
});

export const ProductReviewSchema = new Schema<ProductReviewEntity>({
  comment: String,
  customerId: String,
  date: {type: Date, default: new Date()},
  productId: {type: String, select: false},
  __v: {type: Number, select: false},
  createdAt: {type: String, select: false},
  updatedAt: {type: String, select: false},
});


export const ProductSchema = new Schema<ProductEntity>({
  totalRating: {type: Number, default: 0},
  averageRating: {type: Number, default: 0},
  category: {type: ObjectId, ref: 'product_categories'},
  description: String,
  images: [String],
  name: String,
  price: Number,
  productCode: String,
  quantity: Number,
  thumbnail: String,
  deleted: {type: Boolean, select: false},
  __v: {type: Number, select: false},
  createdAt: {type: String, select: false},
  updatedAt: {type: String, select: false},
}, {
  timestamps: true,
});
