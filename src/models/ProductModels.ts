import {model} from 'mongoose';
import {ProductCategorySchema, ProductReviewSchema, ProductSchema} from '../schemas/ProductSchemas';

export const ProductCategoryModel = model('product_categories', ProductCategorySchema);
export const ProductReviewModel = model('product_reviews', ProductReviewSchema);
export const ProductModel = model('products', ProductSchema);
