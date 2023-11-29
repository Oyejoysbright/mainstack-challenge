import {IProductQueriables, TProductReq} from '../interfaces/ProductInterfaces';
import {ProductModel} from '../models/ProductModels';

export default class ProductRepo {
  static findByNameOrProductCode(name?: string, productCode?: string) {
    return ProductModel.find({
      $or: [
        {name: name},
        {productCode: productCode},
      ],
    })
  }
  static save(payload: TProductReq) {
    return ProductModel.create(payload);
  }
  static update(id: string, payload: TProductReq) {
    return ProductModel.findByIdAndUpdate(id, payload);
  }
  static delete(id: string) {
    return ProductModel.deleteOne({_id: id, soft: true});
  }
  static findAll(page: number, size: number, query: IProductQueriables) {
    return ProductModel.find(query, null, {skip: page * size, limit: size, lean: true})
  }
  static findById(id?: string) {
    return ProductModel.findById(id);
  }
}
