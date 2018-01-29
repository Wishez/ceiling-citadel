import React, { Component } from 'react';
import Logo from './Logo';
import NavContainer from './../containers/NavContainer.js'; 
// import { Container } from 'semantic-ui-react';
  
const Header = ({}) => (
  <header className='header'>
      <div className="container">
		<Logo />
      </div>
  </header>
);
        // <NavContainer />
        // <Contacts />

export default Header;