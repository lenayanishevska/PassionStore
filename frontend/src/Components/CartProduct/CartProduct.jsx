import React from 'react'
import './CartProduct.css'

export const CartProduct = () => {
  return (
    <div className='cart-product flex-column'>
        <hr />
        <div className="cart-product-content flex-row">
            <div className="cart-image-name flex-column">
                <img src="" alt="" />
                <span>Ribbed Tank Top</span>
            </div>
            <div className='cart-product-price'>$ 9.99</div>
            <div className="cart-product-quantity">2</div>
            <div className="cart-product-total-price">$19.98</div>
        </div>
    </div>
  )
}
