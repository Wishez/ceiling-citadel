import React, { Component } from 'react';
import Logo from './Logo';
import NavContainer from './../containers/NavContainer.js'; 
import getClass from './../constants/classes';
import Contacts from './Contacts';
  
const Header = ({
	phone,
	email
}) => (
  	<header className={getClass({b: 'header'})}>
      	<div className={getClass({b: 'container',  add: "parent row"})}>
      		<NavContainer />
      		<Contacts 
      			phone={`+7 (985) 905-12-51`}
      			email={`shiningfinger@list.ru`}/>
			<Logo />
  		</div>
  	</header>
);
        // <Contacts />

export default Header;