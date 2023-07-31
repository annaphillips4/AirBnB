import React, { useState, useEffect } from 'react';
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
  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch()
  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li className='nav-info'>{sessionUser.username}</li>
        <li className='nav-info'>{sessionUser.firstName} {sessionUser.lastName}</li>
        <li className='nav-info'>{sessionUser.email}</li>
        <li className='nav-link'><Link to='/spots/current'>Manage Spots</Link></li>
        <li className='nav-link'><Link to='/spots/new'>Create a New Spot</Link></li>
        <li className='nav-button'><button onClick={logout}>Log Out</button></li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li className='nav-button'>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
        <li className='nav-button'>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          /></li>
      </>
    );
  }

  const toggleShowNav = () => {
    setShowNav(!showNav)
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const navContainer = document.querySelector('.nav-right-container');
      if (navContainer && !navContainer.contains(e.target)) {
        setShowNav(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='navbar'>
      <NavLink exact to="/" className='home'><img src='https://res.cloudinary.com/duakjbyfi/image/upload/v1678545268/AirBnB%20Clone/logo_browser.psd_vhyhya.png' /></NavLink>
      <div className='nav-right-container'>
        {sessionUser ?
          <NavLink exact to="/spots/new" className='your-home'>Airbnb your home</NavLink> :
          <div className='your-home-button'>
            <OpenModalButton
              buttonText="Airbnb your home"
              modalComponent={<SignupFormModal />}
            />
          </div>
        }
        <div className='user-icon' onClick={toggleShowNav}>
          <i class="fa-solid fa-bars" style={{ fontSize: '15px' }} />
          <i class="fa-solid fa-circle-user" />
        </div>
        {showNav &&
          <ul className='nav'>
            {isLoaded && sessionLinks}
            {!sessionUser
              ? <li className="nav-button"><button onClick={handleDemo}>Demo Login</button></li>
              : <></>}
          </ul>}
      </div>
    </div>
  );
}

export default Navigation;
