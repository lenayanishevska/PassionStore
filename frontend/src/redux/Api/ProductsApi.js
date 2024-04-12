import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/'}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: (args) => {
                const { parentId, categoryId } = args;
                return {
                    url: `shop/products/list?${parentId && `parentCategoryId=${parentId}`}&${categoryId && `CategoryId=${categoryId}`}`,
                }
            }
        }),
    })
});
export const {useGetProductsQuery} = productsApi;