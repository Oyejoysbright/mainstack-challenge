import {TProductReviewReq} from '../interfaces/ProductInterfaces';
import {ProductReviewModel} from '../models/ProductModels';

export default class {
  static save(payload: TProductReviewReq) {
    return ProductReviewModel.create(payload);
  }
  static findAll(page: number, size: number) {
    return ProductReviewModel.find(
        {}, null, {skip: page * size, limit: size, lean: true}
    );
  }
}
