import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/'}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ parentCategoryId, sortParams, filterParams, page}) => {
                console.log("Api page: ", page);
                let queryString = `shop/products/list?`;
                if (parentCategoryId) queryString += `parentCategoryId=${parentCategoryId}&`;
                if (sortParams) queryString += `sort=${JSON.stringify(sortParams)}&`;
                if (filterParams) {
                    queryString += `filter=${JSON.stringify(filterParams)}&itemPerPage=180&`;
                  };
                // if(itemPerPage) {
                //     queryString += `itemPerPage=${itemPerPage}&`;
                // };
                if(page) {
                    queryString += `page=${page}`;
                };
                return queryString;
            },
        }),
        getProductById: build.query({
            query: ( {productId} ) => `shop/products/getById?${productId && `productId=${productId}`}`,
        }),
    })
});
export const {useGetProductsQuery, useGetProductByIdQuery} = productsApi;