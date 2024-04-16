import React, { useState } from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import { logoutAction } from '../../redux/Actions/UserActions';
import toast from 'react-hot-toast';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddAddressMutation, useGetAddressQuery } from '../../redux/Api/UserAddressApi';

export const Profile = () => {
  const user = useSelector(state => state.userLogin.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data, refetch} = useGetAddressQuery(user.id);
  const address = (data === undefined || data.success === false) ? '' : data.data;

  const [addAddress, {isError}] = useAddAddressMutation({
    onSuccess: () => {
      // Оновлюємо дані про адресу після успішного додавання
      refetch();
    },
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            {
              address === '' ? <span onClick={handleClickOpen}>Edit</span>
              : <></>
            }
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const address = formJson.address;
                    const city = formJson.city;
                    const country = formJson.country;
                    const zipcode = formJson.zipcode;

                    console.log(address, city, country, zipcode, user.id);

                    await addAddress({address: address, city: city, country: country, zipcode: zipcode, userId: user.id}).unwrap();

                    handleClose();
                  },
                }}
              >
                <DialogTitle>Add Address</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="city"
                    label="City"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="country"
                    label="Country"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="zipcode"
                    label="Zipcode"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Subscribe</Button>
                </DialogActions>
              </Dialog>
          </div>
          <hr />
          <div className="user-adsress-info">
            {
              address === '' ? <h3>No address added!</h3> 
              : <div className="address-info flex-column">
                  <span>Street:</span>
                  <p>{address.address}</p>
                  <span>City:</span>
                  <p>{address.city}</p>
                  <span>Country:</span>
                  <p>{address.country}</p>
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
