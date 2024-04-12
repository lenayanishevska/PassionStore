import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/'}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: ( {parentCategoryId, categoryId} ) => `shop/products/list?${parentCategoryId && `parentCategoryId=${parentCategoryId}`}&${categoryId && `CategoryId=${categoryId}`}`,
        }),
    })
});
export const {useGetProductsQuery} = productsApi;