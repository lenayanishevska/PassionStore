import React, { useState } from 'react'
import './GenderCategory.css'
import CategoriesSlider from '../../Components/CategoriesSlider/CategoriesSlider'
import { useParams } from "react-router-dom";
import Products from '../../Components/Products/Products';
import { useGetCategoriesQuery } from '../../redux/Api/CategoriesApi';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { brown, grey } from '@mui/material/colors';

export const GenderCategory = () => {
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [manufacturer, setManufacturer] = useState();
  const [filterParams, setFilterParams] = useState({});
  const {category} = useParams();
  const [value, setValue] = useState([1, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterParams(prevParams => ({
      ...prevParams,
      fromPrice: parseFloat(value[0]),
      toPrice: parseFloat(value[1]),
    }));
  };

  const handleReset = () => {
    setFilterParams({});
    setManufacturer(null);
  };


  const {data} = useGetCategoriesQuery(category);
  const subcategories = data ? data.data : [];

  const sortParams = {
    sortField: sortField,
    sortOrder: sortOrder,
  }

  const productParams = {
    category: category,
    sortParams: sortParams,
    filterParams: filterParams,
  };

  const header = category === '1'? 'Men\'s': 'Women\'s';

  const materials = [{name: 'Cotton'}, {name:'Jeans'}, {name:'Silk'}, {name:'Wool'}, {name:'Leather'}, {name:'Cashemire'}];
  const brands = [{name: 'Zara'}, {name:'H&M'}, {name:'Mango'}, {name:'Bershka'}, {name:'Reserved'}];
  const prices = [{name: '$5 - $10'}, {name:'$10 - $50'}, {name:'$50 - $100'}, {name:'$100 - $500'}, {name:'$500 - ...'}];

  return (
    <div className='catalog-page'>
      <CategoriesSlider subcategories={subcategories} setFilterParams={setFilterParams}/>
      <div className="main-content flex-row">
        <div className="filters-container flex-column">
          <div className="filters flex-column">
            <h3>Brands</h3>
            <FormGroup>
              {brands.map((item, index) => {
                return (
                  <FormControlLabel key={index} sx={{ color: grey[800] }} control={<Checkbox sx={{
                    color: brown[600],
                    '&.Mui-checked': {
                      color: brown[400],
                    },
                  }}/>} 
                  checked={manufacturer === item.name} 
                  onChange={(e) => {
                    setManufacturer(item.name);
                    setFilterParams(prevParams => ({
                      ...prevParams,
                      manufacturer: !item.name ? null : item.name
                    }));
                  }}
                  label={item.name}/>
                )
              })}
            </FormGroup>
          </div>
          <div className="filters flex-column">
            <h3>Prices</h3>
            <Box sx={{ width: 300 }}>
              <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                // getAriaValueText={valuetext}
                min={1} // Мінімальне значення
                max={1000} // Максимальне значення
                sx={{
                  // Зміна колірних властивостей для слайдера
                  '& .MuiSlider-thumb': {
                      color: '#AC5656', // Колір для кульки-вказівника
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgba(172, 86, 86, 0.16)', // Колір підсвітки кульки при наведенні або фокусі
                    },
                  },
                  '& .MuiSlider-track': {
                      color: '#AC5656', // Колір для заповненої частини слайдера
                  },
                  '& .MuiSlider-rail': {
                      color: '#ccc', // Колір для незаповненої частини слайдера
                  },
                  '& .MuiSlider-valueLabel': {
                      color: '#AC5656', // Колір для мітки значення
                  },
                  '& .MuiSlider-valueLabel': {
                    color: '#AC5656', // Колір для мітки значення
                    backgroundColor: '#B8B2AA', // Колір формочки з цифрою, що з'являється
                  },
              }}
              />
            </Box>
          </div>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="catalog flex-column">
          <div className="catalog-header flex-row">
            <h2>{header} Cloth</h2>
            <div className='sort flex-row'>
              <h3>Sort by:</h3>
              <select onChange={(e) => {
                const [option, order] = e.target.value.split(' ');
                setSortField(option);
                setSortOrder(order);
              }}>
                <option value="name ASC">option</option>
                <option value="price ASC">price (asc)</option>
                <option value="price DESC">price (desc)</option>
                <option value="name ASC">name (asc)</option>
                <option value="name DESC">name (desc)</option>
              </select>
            </div>
          </div>
          <div className="products-list">
            <Products params={productParams}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}
