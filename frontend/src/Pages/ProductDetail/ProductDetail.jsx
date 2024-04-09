import React, { useState } from 'react'
import './ProductDetail.css'
import { useParams } from 'react-router-dom';
import {products} from '../../data.js'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState("0");
  const { productId } = useParams();
  const id = parseInt(productId);

  const product = products.find(item => item.id === id);
  const name = product.name.toUpperCase();

  const images = product.img;
;
  console.log(quantity)


  
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
              <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                  </div>
              </div>
        </Slide>
      </div>
      <div className="product-info flex-column">

        <div className="product-header flex-row">

          <h2>{name}</h2>
          <div className="product-price">
            {product.price}
          </div>

        </div>

        <hr />

        <div className="product-info-details flex-column">

          <div className="options-container flex-column">

            <div className="colors flex-column">

              <h3>COLOR</h3>

              <div className="color-options flex-row">
                <p>{product.color}</p>
              </div>
  
            </div>

            <div className="sizes flex-column">

              <h3>SIZE</h3>

              <div className="size-options flex-row">
                {product.sizes.map((size, index) => {
                  return (
                    <div className='size' key={index}>{size.option}</div>
                  )
                })}
              </div>

            </div>

          </div>

          <input type="number" name="quantity" id="quantity" min="0" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>

          <button>Add to cart</button>

        </div>

        <hr />

        <div className="product-attribes flex-column">

          <h3>DESCRIPTION</h3>
          <p>{product.description}</p>

        </div>

        <hr />

        <div className="product-attribes flex-column">

          <h3>MATERIALS</h3>
          <p>{product.material}</p>

        </div>

      </div>

      <div className="recommended-po-mozluvosti"></div>
    </div>
  )
}
