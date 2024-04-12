import React, { useEffect } from 'react'
import './Navbar.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux';

import { UpperNavBar } from '../UpperNavBar/UpperNavBar'
import search from '../../assets/icons/search.png'
import profile from '../../assets/icons/profile.png'
import parcel from '../../assets/icons/parcel.png'
import { DropDownMenu } from '../DropdownMenu/DropDownMenu'
import { logoutAction } from '../../redux/Actions/UserActions'
import toast from 'react-hot-toast';
import { useGetCategoriesQuery } from '../../redux/Api/CategoriesApi';

export const Navbar = () => {
    const [menu,setMenu] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data} = useGetCategoriesQuery();
    const categories = data ? data.data : [];

    const handlerLogout = () => {
        dispatch(logoutAction());
        toast.success('Logged out successfully!');
        navigate('/login');
    }

    useEffect(() => {
        setMenu("");
    }, []);

  return (
    <div className='full-navbar'>
        <UpperNavBar />
        <nav className="navbar flex-div">
            <div className="nav-left flex-row">
                {categories.map((item) => {
                    return (
                        <h2 key={item.id} onClick={() => setMenu(item.name)}>
                            <Link to={`/products/${item.id}/0`}>{item.name}</Link> {menu === item.name?<hr/>: <></>} 
                        </h2>
                    )
                })}

                <h2 onClick={() => {setMenu("aboutUs")}}>
                    <Link to='/aboutUs'>About us</Link> {menu === "aboutUs"?<hr/>: <></>}
                </h2>
            </div>

            <div className="nav-middle center-flex">
                <Link to='/'><h1>PASSION</h1></Link>
            </div>

            <div className="nav-right flex-row">
                <img src={search} alt="" onClick={handlerLogout}/>
                <Link to='/login'><img src={profile} alt="" /></Link>
                <Link to='/cart'><img src={parcel} alt="" /></Link>
            </div>
        </nav>

        <DropDownMenu menu={menu} />
    </div>
  )
}
