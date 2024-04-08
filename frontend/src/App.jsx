import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './Components/Navbar/Navbar'
import { Home } from './Pages/Home/Home'
import { GenderCategory } from './Pages/GenderCategory/GenderCategory'
import { AboutUs } from './Pages/AboutUs/AboutUs'
import { ProductDetail } from './Pages/ProductDetail/ProductDetail'
import { Favorites } from './Pages/Favorites/Favorites'
import { Cart } from './Pages/Cart/Cart'
import { Login } from './Pages/Login/Login'
import { Registration } from './Pages/Registration/Registration'
import { Profile } from './Pages/Profile/Profile'
import { useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.userInfo);

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/products/:category" element={<GenderCategory />}></Route>
        <Route path='/aboutUs' element={<AboutUs/>}></Route>
        <Route path='/products/:category/:productId' element={<ProductDetail/>}></Route>

        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/favorite' element={<Favorites/>}></Route>
        <Route path='/login' element={user ? <Profile /> : <Login/>} ></Route>
        <Route path='/registration' element={ <Registration/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
