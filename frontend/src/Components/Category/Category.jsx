import React from 'react'
import './Category.css'

export default function Category({name}) {
  return (
    <div className='category-item center-flex'>
        <h3>{name}</h3>
    </div>
  )
}
