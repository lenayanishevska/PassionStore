import React from 'react'
import './ProductDetail.css'
import { useParams } from 'react-router-dom';
import {products} from '../../data.js'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export const ProductDetail = () => {
  const { productId } = useParams();
  const id = parseInt(productId);

  const product = products.find(item => item.id === id);
  const name = product.name.toUpperCase();

  const images = [
    "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F57%2F43%2F5743239b6a1da1d6e34ac99e29d218b6b023e4c4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
    "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa8%2F58%2Fa858514ceede6db5c45cd9587382b107b23aa91f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/fullscreen]",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
];


  
  return (
    <div className='product-detail-page flex-row'>
      <div className="product-images ">
        <Slide>
              <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                  </div>
              </div>
              <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                  </div>
              </div>
        </Slide>
      </div>
      <div className="product-info">
        <div className="product-header flex-row">
          <h2>{name}</h2>
          <div className="product-price">
            {product.price}
          </div>
        </div>
      </div>
      <div className="recommended-po-mozluvosti"></div>
    </div>
  )
}
