import {TProductCategoryReq} from '../interfaces/ProductInterfaces';
import {ProductCategoryModel} from '../models/ProductModels';

export default class {
  static save(payload: TProductCategoryReq) {
    return ProductCategoryModel.create(payload);
  }
  static update(id: string, payload: TProductCategoryReq) {
    return ProductCategoryModel.findByIdAndUpdate(id, payload);
  }
  static findByName(name?: string) {
    return ProductCategoryModel.findOne({name: name});
  }
  static findAll(page: number, size: number) {
    return ProductCategoryModel.find(
        {}, null, {skip: page * size, limit: size, lean: true}
    );
  }
  static delete(id: string) {
    return ProductCategoryModel.deleteOne({_id: id, soft: true});
  }

  static findById(id: string) {
    return ProductCategoryModel.findById(id);
  }
}
