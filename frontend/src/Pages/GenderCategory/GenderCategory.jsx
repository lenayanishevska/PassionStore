import React from 'react'
import './GenderCategory.css'
import CategoriesSlider from '../../Components/CategoriesSlider/CategoriesSlider'
import { useLocation } from "react-router";
import Products from '../../Components/Products/Products';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { brown, grey } from '@mui/material/colors';

export const GenderCategory = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const header = cat === 'women'? 'Women\'s' : 'Man\'s';

  const materials = [{name: 'Cotton'}, {name:'Jeans'}, {name:'Silk'}, {name:'Wool'}, {name:'Leather'}, {name:'Cashemire'}];
  const sizes = [{name: 'XS'}, {name:'S'}, {name:'M'}, {name:'L'}, {name:'XL'}];
  const prices = [{name: '$5 - $10'}, {name:'$10 - $50'}, {name:'$50 - $100'}, {name:'$100 - $500'}, {name:'$500 - ...'}];

  return (
    <div className='catalog-page'>
      <CategoriesSlider/>
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
            <h3>Sizes</h3>
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
              <select>
                <option value="newest">Newest</option>
                <option value="asc">Price (asc)</option>
                <option value="desc">Price (desc)</option>
              </select>
            </div>
          </div>
          <div className="products-list">
            <Products cat={cat}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}
