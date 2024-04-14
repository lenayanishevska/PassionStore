import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/'}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ parentCategoryId, categoryId, sortParams }) => {
                let queryString = `shop/products/list?`;
                if (parentCategoryId) queryString += `parentCategoryId=${parentCategoryId}&`;
                if (categoryId) queryString += `CategoryId=${categoryId}&`;
                if (sortParams) queryString += `sort=${JSON.stringify(sortParams)}`;
                return queryString;
            },
        }),
        getProductById: build.query({
            query: ( {productId} ) => `shop/products/getById?${productId && `productId=${productId}`}`,
        }),
    })
});
export const {useGetProductsQuery, useGetProductByIdQuery} = productsApi;