import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from "../../store/session";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch()
  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <li>
          <Link to='/spots/new'>Create a New Spot</Link>
        </li>
        <li >
          <ProfileButton user={sessionUser} />
        </li>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          /></li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </>
    );
  }

  return (
    // <div className='navBar'>
    //   <NavLink exact to="/" className='home'><img src='https://res.cloudinary.com/duakjbyfi/image/upload/v1678545268/AirBnB%20Clone/logo_browser.psd_vhyhya.png' /></NavLink>
    //   <ul className='nav'><i class="fa-solid fa-bars"></i>
    //     {isLoaded && sessionLinks}
    //     {!sessionUser
    //     ? <li className="nav-button"><button onClick={handleDemo}>Demo Login</button></li>
    //     : <></>}
    //   </ul>
    // </div>
    <div className='navbar'>
      <NavLink exact to="/" className='home'><img src='https://res.cloudinary.com/duakjbyfi/image/upload/v1678545268/AirBnB%20Clone/logo_browser.psd_vhyhya.png' /></NavLink>
      <div className='nav-right-container'>
        <div className='your-home'>Airbnb your home</div>
        <div className='user-icon'>
        <i class="fa-solid fa-bars" style={{ fontSize: '15px' }}></i>
          <i class="fa-solid fa-circle-user" />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
