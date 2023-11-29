import express from 'express';
import ProductRoutes from '../routes/ProductRoutes';
import {pageableValidationMDW} from '@tawol-tech/tinnie/middlewares/pageableValidationMDW';
import {ResponseService} from '@tawol-tech/tinnie/response/ResponseService';
import ProductService from '../services/ProductService';
import ProductJoiSchema from '../joi_schemas/ProductJoiSchema';
import {schemaValidationMDW} from '@tawol-tech/tinnie/middlewares/schemaValidation';
import {IDJoiSchema, PageableJoiSchema} from '@tawol-tech/tinnie/interfaces/joi.schema';

const ProductController = express.Router();

ProductController.get(ProductRoutes.PRODUCT_LIST,
    pageableValidationMDW(ProductJoiSchema.queriables),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.getProducts(
            Number.parseInt((req.query.page ?? 0) as string),
            Number.parseInt((req.query.size ?? 0) as string),
            req.body);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

ProductController.post(ProductRoutes.ADD_PRODUCT,
    schemaValidationMDW(ProductJoiSchema.addProduct),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.addProduct(req.body);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

ProductController.put(ProductRoutes.MODIFY_PRODUCT,
    schemaValidationMDW(ProductJoiSchema.updateProduct),
    schemaValidationMDW(IDJoiSchema, 'query'),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.modifyProduct(req.query.id as string, req.body);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    }
);

ProductController.put(ProductRoutes.DELETE_PRODUCT,
    schemaValidationMDW(IDJoiSchema),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.deleteProduct(req.query.id as string);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    }
);

ProductController.get(ProductRoutes.CATEGORY_LIST,
    schemaValidationMDW(PageableJoiSchema),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.getCategories(
            Number.parseInt((req.query.page ?? 0) as string),
            Number.parseInt((req.query.size ?? 0) as string)
        );
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

ProductController.post(ProductRoutes.ADD_CATEGORY,
    schemaValidationMDW(ProductJoiSchema.addCategory),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.addCategory(req.body);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

ProductController.put(ProductRoutes.MODIFY_CATEGORY,
    schemaValidationMDW(ProductJoiSchema.updateCategory),
    schemaValidationMDW(IDJoiSchema, 'query'),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.modifyCategory(req.query.id as string, req.body);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    }
);

ProductController.put(ProductRoutes.DELETE_CATEGORY,
    schemaValidationMDW(IDJoiSchema),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.deleteCategory(req.query.id as string);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    }
);

ProductController.get(ProductRoutes.GET_PRODUCT_DETAILS,
    schemaValidationMDW(IDJoiSchema),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.getProduct(req.query.id as string);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

ProductController.post(ProductRoutes.ADD_REVIEW,
    schemaValidationMDW(ProductJoiSchema.addReview),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.addReview(req.body);
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });

ProductController.get(ProductRoutes.GET_REVIEWS,
    schemaValidationMDW(IDJoiSchema, 'params'),
    schemaValidationMDW(PageableJoiSchema, 'query'),
    async (req, res, next) => {
      try {
        const rPayload = await ProductService.getReviews(
            Number.parseInt((req.query.page ?? 0) as string),
            Number.parseInt((req.query.size ?? 0) as string)
        );
        return ResponseService.builder(res, rPayload);
      } catch (error) {
        ResponseService.throwError(next, error);
      }
    });
export default ProductController;
