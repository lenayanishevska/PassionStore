import React from 'react';
import './Products.css';
import Product from '../Product/Product.jsx';
import { Link } from 'react-router-dom';
import { useGetProductsQuery} from '../../redux/Api/ProductsApi';

export default function Products({params}) {
  const {category, subcategory, sortParams, filterParams} = params;
  let products;

  subcategory === undefined? 0 : subcategory;

  const { data, isLoading, isError } = useGetProductsQuery({parentCategoryId: category, categoryId: subcategory, sortParams: sortParams});
  products = data ? data.data : [];

  return (
    <div className='products-grid'>
        {products.map((item) => {
            return (
                <Link key={item.id} to={`/products/${category}/${item.CategoryId}/${item.id}`}><Product item={item}/></Link>
            )
        })}
    </div>
  );
}
