import React from 'react'
import './CartProduct.css'
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteProductFromCartMutation } from '../../redux/Api/OderApi';

export const CartProduct = ({item, setTotal}) => {
  const [deleteProductFromCart] = useDeleteProductFromCartMutation();

  const handleDelete = async (orderProductId) => {
    console.log(orderProductId);
    const res = await deleteProductFromCart({orderProductId}).unwrap();
    console.log(res);
  }

  return (
    <div className='cart-product flex-column'>
        <hr />
        <div className="cart-product-content flex-row">
            <div className="cart-image-name flex-row">
                <span>{item.Product.name}</span>
            </div>
            <div className='cart-product-option'>$ {item.Product.price}</div>
            <div className="cart-product-option">{item.quantity}</div>
            <div className="cart-product-option">$ {item.amount}</div>
            <div className="cart-product-option cart-delete">
              <div className="delete-card-product" onClick={() => handleDelete(item.id)}><CloseIcon style={{ color: '#716D69' }}/></div>
            </div>
        </div>
    </div>
  )
}
