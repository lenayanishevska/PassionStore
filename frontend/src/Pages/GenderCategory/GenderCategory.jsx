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
  const [CategoryId, setCategoryId] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [fromPrice, setFromPrice] = useState();
  const [toPrice, setToPrice] = useState();
  const [filterParams, setFilterParams] = useState({});
  const {category, subcategory} = useParams();
  const [value, setValue] = useState([1, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFromPrice(parseFloat(value[0]));
    setToPrice(parseFloat(value[1]));
    setFilterParams(prevParams => ({
      ...prevParams,
      fromPrice: parseFloat(value[0]),
      toPrice: parseFloat(value[1]),
    }));
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
      <CategoriesSlider subcategories={subcategories} setCategoryId={setCategoryId} setFilterParams={setFilterParams}/>
      <div className="main-content flex-row">
        <div className="filters-container flex-column">
          <div className="filters flex-column">
            <h3>Materials</h3>
            <FormGroup>
              {materials.map((item, index) => {
                return (
                  <FormControlLabel key={index} sx={{ color: grey[800] }} control={<Checkbox sx={{
                    color: brown[600],
                    '&.Mui-checked': {
                      color: brown[400],
                    },
                  }}/>} label={item.name}/>
                )
              })}
            </FormGroup>
          </div>
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
              />
            </Box>
          </div>
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
