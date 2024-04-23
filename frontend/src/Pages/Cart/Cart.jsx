import React, { useEffect, useState } from 'react'
import './Cart.css'
import { CartProduct } from '../../Components/CartProduct/CartProduct'
import { useCreateOrderMutation, useGetOrderProductsQuery } from '../../redux/Api/OderApi'
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const user = useSelector(state => state.userLogin.userInfo);
  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();

  if(!user) {
    console.log("User was not found");
  }

  const userId = user.data.id;
  const { data, refetch} = useGetOrderProductsQuery(userId);
  const cartProducts = data ? data.data : [];

  const handleCreateOrder = async () => {
    const res = await createOrder({ userId: user.data.id }).unwrap();
    console.log(res);
  }

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
          <button onClick={handleCreateOrder}>Buy Now</button>
        </div>
        <div className='back-to-shop' 
          onClick={() => {
            navigate('/');
          }}>
          Back to shopping
        </div>
      </div>

    </div>
  )
}
