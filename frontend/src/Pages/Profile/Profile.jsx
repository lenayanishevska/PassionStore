import React from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import { logoutAction } from '../../redux/Actions/UserActions';
import toast from 'react-hot-toast';

export const Profile = () => {
  const user = useSelector(state => state.userLogin.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(logoutAction());
    toast.success('Logged out successfully!');
    navigate('/login');
}

  return (
    <div className='profile flex-column'>
      <div className="profile-user-header"><h3>HELLO, {user.first_name.toUpperCase()}</h3></div>
      <div className="profile-details flex-column">
        <div className="user-info flex-column">
          <span>My Profile Details</span>
          <hr />
          <div className="details-info flex-column">
            <span>Email:</span>
            <p>{user.email}</p>
          </div>
          <div className="details-info flex-column">
            <span>First Name:</span>
            <p>{user.first_name}</p>
          </div>
          <div className="details-info flex-column">
            <span>Last Name:</span>
            <p>{user.last_name}</p>
          </div>
        </div>
        <hr />
        <div className="user-address flex-column">
          <div className="user-address-header flex-row">
            <h3>Address</h3>
            <span>Edit</span>
          </div>
          <hr />
          <div className="user-adsress-info">
            {
              true ? <span>No address added!</span> 
              : <div className="details-info flex-column">
                  <span>Street:</span>
                  <p>Gorodotska, 173</p>
                  <span>City:</span>
                  <p>Lviv</p>
                  <span>Country:</span>
                  <p>Ukraine</p>
                </div>
            }
          </div>
        </div>
        <hr />
        <div className="profile-buttons flex-row">
          {
            user.is_admin ?<Link to='/admin'><button className='admin-button'>Admin Panel</button></Link> : <></>
          }
          <button className='lodout-button'>Log out</button>
        </div>
      </div>
    </div>
  )
}
