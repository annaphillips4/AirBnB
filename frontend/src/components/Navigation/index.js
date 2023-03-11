import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
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
    <div className='navBar'>
      <NavLink exact to="/" className='home'><img src='https://res.cloudinary.com/duakjbyfi/image/upload/v1678545268/AirBnB%20Clone/logo_browser.psd_vhyhya.png' /></NavLink>
      <ul className='nav'>
        {isLoaded && sessionLinks}
      </ul>
    </div>
  );
}

export default Navigation;
