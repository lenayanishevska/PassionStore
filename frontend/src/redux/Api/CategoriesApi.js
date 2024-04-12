import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/'}),
    endpoints: (build) => ({
        getCategories: build.query({
            query: (parentId = '') => `shop/categories/list?${parentId && `parentCategoryId=${parentId}`}`,
        }),
    })
});
export const {useGetCategoriesQuery} = categoriesApi;