import React from 'react'
import './CartProduct.css'

export const CartProduct = ({item}) => {
  return (
    <div className='cart-product flex-column'>
        <hr />
        <div className="cart-product-content flex-row">
            <div className="cart-image-name flex-row">
                <span>{item.name}</span>
            </div>
            <div className='cart-product-option'>{item.price}</div>
            <div className="cart-product-option">{item.quantity}</div>
            <div className="cart-product-option">{item.total}</div>
        </div>
    </div>
  )
}
