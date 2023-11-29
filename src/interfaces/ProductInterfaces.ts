export interface ProductEntity {
    id: string;
    productCode: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    thumbnail: string;
    images: string[];
    totalRating: number;
    averageRating: number;
    category: ProductCategoryEntity;
    deleted?: boolean;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductCategoryEntity {
    id: string;
    name: string;
    description: string;
    deleted: boolean;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductReviewEntity {
    id: string;
    productId: string;
    customerId: string;
    rating: number;
    comment: string;
    date: Date;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IProductQueriables {
    productCode: string;
    name: string;
    price: number;
    priceLowerRange: number;
    priceUpperRange: number;
    quantity: number;
    quantityLowerRange: number;
    quantityUpperRange: number;
    rating: number;
    ratingLowerRange: number;
    ratingUpperRange: number;
}

export type TProductReq = Partial<ProductEntity>;
export type TProductCategoryReq = Partial<ProductCategoryEntity>;
export type TProductReviewReq = Partial<ProductReviewEntity>;
