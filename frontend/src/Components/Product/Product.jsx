import React from 'react'
import './Product.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import product from '../../assets/pictures/Berfinben.jpeg'

export default function Product({item}) {
  return (
    <div className='product flex-column'>
        <img src={item.img[0]} alt="" />
        <div className="info flex-column">
            <div className="name-like flex-row">
                <h3>{item.name}</h3>
                <FavoriteBorderIcon/>
            </div>
            <div className="price">{item.price}</div>
        </div>
    </div>
  )
}
