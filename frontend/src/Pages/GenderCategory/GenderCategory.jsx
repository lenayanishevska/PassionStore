import React, { useState } from 'react'
import './GenderCategory.css'
import CategoriesSlider from '../../Components/CategoriesSlider/CategoriesSlider'
import { useParams } from "react-router-dom";
import Products from '../../Components/Products/Products';
import { useGetCategoriesQuery } from '../../redux/Api/CategoriesApi';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { brown, grey } from '@mui/material/colors';

export const GenderCategory = () => {
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [clothCategory, setClothCategory] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [fromPrice, setFromPrice] = useState();
  const [toPrice, setToPrice] = useState();
  const {category, subcategory} = useParams();

  console.log("Cloth Category ", clothCategory);

  const {data} = useGetCategoriesQuery(category);
  const subcategories = data ? data.data : [];

  const sortParams = {
    sortField: sortField,
    sortOrder: sortOrder,
  }

  const filterParams = {
    clothCategory: clothCategory,
    manufacturer: manufacturer,
    fromPrice: fromPrice,
    toPrice: toPrice,
  }

  const productParams = {
    category: category,
    subcategory: subcategory,
    sortParams: sortParams,
    filterParams: filterParams,
  };

  const header = category === '1'? 'Men\'s': 'Women\'s';

  const materials = [{name: 'Cotton'}, {name:'Jeans'}, {name:'Silk'}, {name:'Wool'}, {name:'Leather'}, {name:'Cashemire'}];
  const sizes = [{name: 'XS'}, {name:'S'}, {name:'M'}, {name:'L'}, {name:'XL'}];
  const prices = [{name: '$5 - $10'}, {name:'$10 - $50'}, {name:'$50 - $100'}, {name:'$100 - $500'}, {name:'$500 - ...'}];

  return (
    <div className='catalog-page'>
      <CategoriesSlider subcategories={subcategories} setClothCategory={setClothCategory}/>
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
              {sizes.map((item, index) => {
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
            <h3>Prices</h3>
            <FormGroup>
              {prices.map((item, index) => {
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
