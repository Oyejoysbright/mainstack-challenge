import Joi from 'joi';
import {
  IProductQueriables, TProductCategoryReq, TProductReq, TProductReviewReq,
} from '../interfaces/ProductInterfaces';
import {JoiValidator} from '@tawol-tech/tinnie/validators/JoiValidator';
import {AppConfigs} from '../configs/app';

export default {
  addProduct: Joi.object<TProductReq>({
    category: Joi.custom(JoiValidator.ObjectId).required(),
    description: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    thumbnail: Joi.string().required(),
    productCode: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
  queriables: Joi.object<IProductQueriables>({
    name: Joi.string(),
    price: Joi.number(),
    priceLowerRange: Joi.number(),
    priceUpperRange: Joi.number(),
    productCode: Joi.string(),
    quantity: Joi.number(),
    quantityLowerRange: Joi.number(),
    quantityUpperRange: Joi.number(),
    rating: Joi.number().min(0).max(AppConfigs.RATING_SCALE),
    ratingLowerRange: Joi.number().min(0).max(AppConfigs.RATING_SCALE),
    ratingUpperRange: Joi.number().min(0).max(AppConfigs.RATING_SCALE),
  }),
  updateProduct: Joi.object<TProductReq>({
    category: Joi.custom(JoiValidator.ObjectId),
    description: Joi.string(),
    name: Joi.string(),
    price: Joi.string(),
    thumbnail: Joi.string().required(),
    quantity: Joi.number().required(),
    images: Joi.array().items(Joi.string()).min(1).max(10),
  }),
  addCategory: Joi.object<TProductCategoryReq>({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
  updateCategory: Joi.object<TProductCategoryReq>({
    name: Joi.string(),
    description: Joi.string(),
  }),
  addReview: Joi.object<TProductReviewReq>({
    comment: Joi.string().required(),
    customerId: Joi.custom(JoiValidator.ObjectId).required(),
    productId: Joi.custom(JoiValidator.ObjectId).required(),
    rating: Joi.number().min(0).max(AppConfigs.RATING_SCALE).required(),
  }),

}
