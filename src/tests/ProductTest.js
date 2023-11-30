import ProductService from '../services/ProductService';
import ProductCategoryRepo from '../repos/ProductCategoryRepo';
import ResponseBuilder from '@tawol-tech/tinnie/response/ResponseBody';
import {ResponseMessage} from '@tawol-tech/tinnie/response/ResponseMessage';
import ResponseMessageEx from '../constants/ResponseMessageEx';
import ProductRepo from '../repos/ProductRepo';

jest.mock('..//repos/ProductRepo');
jest.mock('..//repos/ProductCategoryRepo');
jest.mock('..//repos/ProductReviewRepo');

describe('ProductService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addProduct', () => {
    it('should return 201 Created if the product is added successfully', async () => {
      const payload = {name: 'Product 1', productCode: 'P001'};
      ProductRepo.findByNameOrProductCode.mockResolvedValue(null);
      ProductRepo.save.mockResolvedValue();

      const response = await ProductService.addProduct(payload);

      expect(ProductRepo.findByNameOrProductCode).toHaveBeenCalledWith(payload.name, payload.productCode);
      expect(ProductRepo.save).toHaveBeenCalledWith(payload);
      expect(response).toEqual(ResponseBuilder.getInstance().created(ResponseMessage.CREATED));
    });

    it('should return 400 Bad Request if a similar product already exists', async () => {
      const payload = {name: 'Product 1', productCode: 'P001'};
      ProductRepo.findByNameOrProductCode.mockResolvedValue({});

      const response = await ProductService.addProduct(payload);

      expect(ProductRepo.findByNameOrProductCode).toHaveBeenCalledWith(payload.name, payload.productCode);
      expect(response).toEqual(ResponseBuilder.getInstance().badRequest(ResponseMessageEx.SIMILAR_PRODUCT));
    });
  });

  describe('modifyProduct', () => {
    it('should return 200 OK if the product is modified successfully', async () => {
      const id = '123';
      const payload = {name: 'Modified Product', productCode: 'P002'};
      ProductRepo.findById.mockResolvedValue({});

      const response = await ProductService.modifyProduct(id, payload);

      expect(ProductRepo.findById).toHaveBeenCalledWith(id);
      expect(ProductRepo.update).toHaveBeenCalledWith(id, payload);
      expect(response).toEqual(ResponseBuilder.getInstance().ok(ResponseMessage.DELETED));
    });

    it('should return 400 Bad Request if the product does not exist', async () => {
      const id = '123';
      const payload = {name: 'Modified Product', productCode: 'P002'};
      ProductRepo.findById.mockResolvedValue(null);

      const response = await ProductService.modifyProduct(id, payload);

      expect(ProductRepo.findById).toHaveBeenCalledWith(id);
      expect(response).toEqual(ResponseBuilder.getInstance().badRequest(ResponseMessage.NOT_EXIST));
    });
  });

  describe('deleteProduct', () => {
    it('should return 200 OK if the product is deleted successfully', async () => {
      const id = '123';
      ProductRepo.findById.mockResolvedValue({delete: jest.fn()});

      const response = await ProductService.deleteProduct(id);

      expect(ProductRepo.findById).toHaveBeenCalledWith(id);
      expect(response).toEqual(ResponseBuilder.getInstance().ok(ResponseMessage.DELETED));
    });

    it('should return 400 Bad Request if the product does not exist', async () => {
      const id = '123';
      ProductRepo.findById.mockResolvedValue(null);

      const response = await ProductService.deleteProduct(id);

      expect(ProductRepo.findById).toHaveBeenCalledWith(id);
      expect(response).toEqual(ResponseBuilder.getInstance().badRequest(ResponseMessage.NOT_EXIST));
    });
  });

  describe('getCategories', () => {
    it('should return the list of categories with 200 OK', async () => {
      const page = 1;
      const size = 10;
      const categories = [{name: 'Category 1'}, {name: 'Category 2'}];
      ProductCategoryRepo.findAll.mockResolvedValue(categories);

      const response = await ProductService.getCategories(page, size);

      expect(ProductCategoryRepo.findAll).toHaveBeenCalledWith(page, size);
      expect(response).toEqual(ResponseBuilder.getInstance().ok(ResponseMessage.DATA_FETCHED, categories));
    });
  });

  // Add more test cases for the remaining functions
});
