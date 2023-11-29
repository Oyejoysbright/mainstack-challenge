import ResponseBuilder from '@tawol-tech/tinnie/response/ResponseBody';
import ProductReviewRepo from '../repos/ProductReviewRepo';
import {ResponseMessage} from '@tawol-tech/tinnie/response/ResponseMessage';
import ProductRepo from '../repos/ProductRepo';
import {
  IProductQueriables, TProductCategoryReq, TProductReq, TProductReviewReq,
} from '../interfaces/ProductInterfaces';
import ProductCategoryRepo from '../repos/ProductCategoryRepo';
import ResponseMessageEx from '../constants/ResponseMessageEx';
import {AppConfigs} from '../configs/app';

export default class ProductService {
  static async addProduct(payload: TProductReq) {
    const doc = await ProductRepo.findByNameOrProductCode(payload.name, payload.productCode);
    if (doc) {
      return ResponseBuilder.getInstance().badRequest(ResponseMessageEx.SIMILAR_PRODUCT);
    }
    await ProductRepo.save(payload);
    return ResponseBuilder.getInstance().created(ResponseMessage.CREATED);
  }
  static async modifyProduct(id: string, payload: TProductReq) {
    const data = await ProductRepo.findById(id);
    if (!data) {
      return ResponseBuilder.getInstance().badRequest(ResponseMessage.NOT_EXIST);
    }
    await ProductRepo.update(id, payload);
    return ResponseBuilder.getInstance().ok(ResponseMessage.DELETED);
  }
  static async deleteProduct(id: string) {
    const data = await ProductRepo.findById(id);
    if (!data) {
      return ResponseBuilder.getInstance().badRequest(ResponseMessage.NOT_EXIST);
    }
    await data.delete();
    return ResponseBuilder.getInstance().ok(ResponseMessage.DELETED);
  }
  static async getCategories(page: number, size: number) {
    const data = await ProductCategoryRepo.findAll(page, size);
    return ResponseBuilder.getInstance().ok(ResponseMessage.DATA_FETCHED, data);
  }
  static async addCategory(payload: TProductCategoryReq) {
    const doc = await ProductCategoryRepo.findByName(payload.name);
    if (doc) {
      return ResponseBuilder.getInstance().badRequest(ResponseMessage.ALREADY_EXIST);
    }
    await ProductCategoryRepo.save(payload);
    return ResponseBuilder.getInstance().created(ResponseMessage.CREATED);
  }
  static async modifyCategory(id: string, payload: TProductCategoryReq) {
    const data = await ProductCategoryRepo.findById(id);
    if (!data) {
      return ResponseBuilder.getInstance().badRequest(ResponseMessage.NOT_EXIST);
    }
    await ProductCategoryRepo.update(id, payload);
    return ResponseBuilder.getInstance().ok(ResponseMessage.DELETED);
  }
  static async deleteCategory(id: string) {
    const data = await ProductCategoryRepo.findById(id);
    if (!data) {
      return ResponseBuilder.getInstance().badRequest(ResponseMessage.NOT_EXIST);
    }
    await data.delete();
    return ResponseBuilder.getInstance().ok(ResponseMessage.DELETED);
  }
  static async getProducts(page: number, size: number, query: IProductQueriables) {
    const data = await ProductRepo.findAll(page, size, query);
    return ResponseBuilder.getInstance().ok(ResponseMessage.DATA_FETCHED, data);
  }
  static async getProduct(id: string) {
    const data = await ProductRepo.findById(id);
    return ResponseBuilder.getInstance().ok(ResponseMessage.DATA_FETCHED, data);
  }
  static async addReview(payload: TProductReviewReq) {
    const product = await ProductRepo.findById(payload.productId);
    if (!product) {
      return ResponseBuilder.getInstance().badRequest(ResponseMessageEx.PRODUCT_NOT_EXIST);
    }
    product.totalRating += (payload.rating ?? 0);
    product.averageRating = product.totalRating / AppConfigs.RATING_SCALE;
    await ProductReviewRepo.save(payload);
    await product.save();
    return ResponseBuilder.getInstance().created(ResponseMessage.CREATED);
  }
  static async getReviews(page: number, size: number) {
    const data = await ProductReviewRepo.findAll(page, size);
    return ResponseBuilder.getInstance().ok(ResponseMessage.DATA_FETCHED, data);
  }
}
