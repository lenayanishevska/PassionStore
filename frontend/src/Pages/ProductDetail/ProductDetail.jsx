import React, { useState } from 'react'
import './ProductDetail.css'
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useGetProductByIdQuery } from '../../redux/Api/ProductsApi.js';

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState("1");
  const { productId } = useParams();

  const { data, error, isLoading } = useGetProductByIdQuery({ productId: productId });
  console.log(data);
  const product = data ? data.data : '';
  console.log(product);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const name = product.name.toUpperCase();

  const image = 'http://localhost:5001/' + product.image_url;

  const sizes = ["S", "M"];

  
  return (
    <div className='product-detail-page flex-row'>
      <div className="product-images ">
        <Slide>
              <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${image})` }}>
                  </div>
              </div>
        </Slide>
      </div>
      <div className="product-info flex-column">

        <div className="product-header flex-row">

          <h2>{name}</h2>
          <div className="product-price">
            $ {product.price}
          </div>

        </div>

        <hr />

        <div className="product-info-details flex-column">

          <div className="options-container flex-column">

            <div className="colors flex-column">

              <h3>COLOR</h3>

              <div className="color-options flex-row">
                <p>Beige</p>
              </div>
  
            </div>

            <div className="sizes flex-column">

              <h3>SIZE</h3>

              <div className="size-options flex-row">
                {sizes.map((size, index) => {
                  return (
                    <div className='size' key={index}>{size}</div>
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
          <h3>Brand</h3>
          <p>{product.Manufacturer.name}</p>

        </div>

        <hr />

        <div className="product-attribes flex-column">

          <h3>MATERIALS</h3>
          <p>Cotton</p>

        </div>

      </div>

      <div className="recommended-po-mozluvosti"></div>
    </div>
  )
}
