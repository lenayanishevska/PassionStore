import React from 'react'
import './CategoriesSlider.css'
// import {categories} from '../../data.js'
import Category from '../Category/Category.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';


export default function CategoriesSlider({subcategories}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
      };
  return (
    <div className="slider-container">
        <div className='slider'>
            <Slider {...settings}>
                {subcategories.map((item) => {
                    return (
                        <Link key={item.id} to={`/products/${item.parentCategoryId}/${item.id}`}><Category name={item.name}/></Link>
                    )
                })}
            </Slider>
        </div>
    </div>

  )
}
