import React, { useEffect, useState } from 'react'
import './Cart.css'
import { CartProduct } from '../../Components/CartProduct/CartProduct'
import { useGetOrderProductsQuery } from '../../redux/Api/OderApi'
import { useSelector} from 'react-redux';

export const Cart = () => {
  const user = useSelector(state => state.userLogin.userInfo);

  if(!user) {
    console.log("User was not found");
  }

  const userId = user.id;
  const { data, refetch} = useGetOrderProductsQuery(userId);
  const cartProducts = data ? data.data : [];

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  const total = cartProducts.reduce((accumulator, item) => {
    return accumulator + item.amount;
  }, 0).toFixed(2);

  return (
    <div className='shopping-cart flex-row'>

      <div className="cart-products flex-column">
        <h2>Shopping Cart</h2>
        <div className="table-headers flex-column">
          <hr />
          <div className="cart-product-content flex-row">
              <div className="cart-image-name flex-row">
                  <span>Item</span>
              </div>
              <div className='cart-product-option'>Price</div>
              <div className="cart-product-option">Quantity</div>
              <div className="cart-product-option">Total</div>
              <div className="cart-product-option">Delete</div>
          </div>
        </div>
        {
          cartProducts.map((item) => {
              return (
                  <CartProduct key={item.id} item={item} />
              )
        })}
      </div>

      <div className="cart-summary flex-column ">
        <div className="cart-summary-container flex-column">
          <div className="summary">
            <h3>Summary</h3>
            <hr />
          </div>
          <div className="order-price-content flex-row">
            <span>Total price: </span>
            <div className="order-price">$ {total}</div>
          </div>
          <button>Buy Now</button>
        </div>
      </div>

    </div>
  )
}
