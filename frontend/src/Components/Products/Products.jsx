import React from 'react'
import './Products.css'
import {products} from '../../data.js'
import Product from '../Product/Product.jsx'
import { Link } from 'react-router-dom'

export default function Products({cat}) {
  return (
    <div className='products-grid'>
        {products.map((item) => {
            return (
                <Link key={item.id} to={`${item.id}`}><Product item={item}/></Link>
            )
        })}
    </div>
  )
}
