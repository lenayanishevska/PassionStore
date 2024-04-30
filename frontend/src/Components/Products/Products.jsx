import React, { useEffect } from 'react';
import './Products.css';
import Product from '../Product/Product.jsx';
import { Link } from 'react-router-dom';
import { useGetProductsQuery} from '../../redux/Api/ProductsApi';

export default function Products({params, setPage, setPageCount, page}) {
  const {category, sortParams, filterParams} = params;
  // let products;


  const itemPerPage = 9;

  console.log("page ", page);

  const { data, isLoading, isError } = useGetProductsQuery({parentCategoryId: category, sortParams: sortParams, filterParams: filterParams, page});
  const products = data && data !== undefined ? data.data : null;

  console.log(data);

  useEffect(() => {
      products && setPageCount(products.pageCount) ;
  }, [data]);

  return (
    <div className='products-grid'>
        {products ? products.list.map((item) => {
            return (
                <Link key={item.id} to={`/products/${category}/${item.id}`}><Product item={item}/></Link>

            )
        }) : <></>}
    </div>
  );
}
