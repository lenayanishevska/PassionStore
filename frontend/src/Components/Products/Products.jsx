import React from 'react';
import './Products.css';
import Product from '../Product/Product.jsx';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../redux/Api/ProductsApi';

export default function Products({category, subcategory}) {
  subcategory === undefined? 0 : subcategory;

  const { data, isLoading, isError } = useGetProductsQuery({parentCategoryId: category, categoryId: subcategory});
  const products = data ? data.data : [];

  console.log(products);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

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
