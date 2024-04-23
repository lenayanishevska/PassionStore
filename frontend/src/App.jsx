import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './Components/Navbar/Navbar'
import { Home } from './Pages/Home/Home'
import { GenderCategory } from './Pages/GenderCategory/GenderCategory'
import { AboutUs } from './Pages/AboutUs/AboutUs'
import { ProductDetail } from './Pages/ProductDetail/ProductDetail'
import { Cart } from './Pages/Cart/Cart'
import { Login } from './Pages/Login/Login'
import { Registration } from './Pages/Registration/Registration'
import { Profile } from './Pages/Profile/Profile'
import { Admin } from './Pages/Admin/Admin';
import { Page } from './Pages/Page';
import { OrderInfo } from './Pages/OrderInfo/OrderInfo'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        {/* <Route path="/products/:category/:subcategory" element={<GenderCategory />}></Route> */}
        <Route path="/products/:category" element={<GenderCategory />}></Route>
        <Route path='/aboutUs' element={<AboutUs/>}></Route>
        {/* <Route path='/products/:category/:subcategory/:productId' element={<ProductDetail/>}></Route> */}
        <Route path='/products/:category/:productId' element={<ProductDetail/>}></Route>

        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/orderInfo' element={<OrderInfo/>}></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/profile' element={<Profile/>} ></Route>
        <Route path='/registration' element={ <Registration/>}></Route>
        <Route path='/admin' element={ <Admin/>}></Route>
        <Route path='/pages/:alias' element={<Page/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
