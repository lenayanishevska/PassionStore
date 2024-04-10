import React from 'react'
import './Cart.css'
import { CartProduct } from '../../Components/CartProduct/CartProduct'

export const Cart = () => {
  return (
    <div className='shopping-cart flex-row'>

      <div className="cart-products flex-column">
        <h2>Shopping Cart</h2>
        <CartProduct/>
      </div>

      <div className="cart-summary flex-column">
        <h3>Summary</h3>
        <div className="order-price-content flex-row">
          <span>Total price: </span>
          <div className="order-price">$ 20</div>
        </div>
        <button>Buy Now</button>
      </div>

    </div>
  )
}
