import React, { useState } from 'react'
import './CategoriesSlider.css'
// import {categories} from '../../data.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';


export default function CategoriesSlider({subcategories, setClothCategory}) {
    const [isClicked, setIsClicked] = useState('');

    console.log("IsClicked: ",isClicked);

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
                        <Link key={item.id} to={`/products/${item.parentCategoryId}/${item.id}`}>
                            <div className='category-item center-flex' onClick={() => {
                                setClothCategory(item.name);
                                setIsClicked(item.name);
                                }}>
                                <h3>{item.name} {isClicked === item.name? <hr/>: <></>}</h3>
                            </div>
                        </Link>
                    )
                })}
            </Slider>
        </div>
    </div>

  )
}
