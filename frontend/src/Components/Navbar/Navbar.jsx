import React, { useEffect } from 'react'
import './Navbar.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux';

import { UpperNavBar } from '../UpperNavBar/UpperNavBar'
import search from '../../assets/icons/search.png'
import profile from '../../assets/icons/profile.png'
import wishlist from '../../assets/icons/wishlist.png'
import parcel from '../../assets/icons/parcel.png'
import { DropDownMenu } from '../DropdownMenu/DropDownMenu'
import { logoutAction } from '../../redux/Actions/UserActions'
import toast from 'react-hot-toast';

export const Navbar = () => {
    const [menu,setMenu] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                <h2 onMouseEnter={() => setMenu("women")} 
                    onMouseLeave={() => setMenu("")} 
                    onClick={() => setMenu("women")}>
                    <Link to='/women'>Women</Link> {menu === "women"?<hr/>: <></>} 
                </h2>
                <h2 onMouseEnter={() => setMenu("men")} 
                    onMouseLeave={() => setMenu("")} 
                    onClick={() => {setMenu("men")}}>
                    <Link to='/men'>Men</Link> {menu === "men"?<hr/>: <></>}
                </h2>

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
                <Link to='/favorite'><img src={wishlist} alt="" /></Link>
                <Link to='/cart'><img src={parcel} alt="" /></Link>
            </div>
        </nav>

        <DropDownMenu menu={menu} />
    </div>
  )
}
