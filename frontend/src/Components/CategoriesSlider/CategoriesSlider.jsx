import React from 'react'
import './CategoriesSlider.css'
import categories from '../../data.js'
import Category from '../Category/Category.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function CategoriesSlider() {
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
                {categories.map((e, index) => {
                    return (
                        <Category key={index} name={e.name}/>
                    )
                })}
            </Slider>
        </div>
    </div>

  )
}
