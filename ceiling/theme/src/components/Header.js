import React from 'react';
import Logo from './Logo';
import NavContainer from './../containers/NavContainer.js'; 
import getClass from './../constants/classes';
import Contacts from './Contacts';
import SearchContainer from './../containers/SearchContainer';
import OrderButton from './OrderButton';
import CallbackButton from './CallbackButton';
import ButtonsGroup from './ButtonsGroup';

const Header = ({
	phone,
	email,
  quantityOrderedProducts
}) => (
  	<header className={getClass({b: 'header'})}>
  	  <div className={getClass({b: 'container',  add: "parent row v-centered h-around"})}>
      		<NavContainer />
      		<Contacts 
      			phone={` +7 (985) 905-12-51`}
      			email={` shiningfinger@list.ru`}/>
			   <Logo />
         <SearchContainer />
         <ButtonsGroup className="baseChild">
           <CallbackButton />
           <OrderButton quantityOrderedProducts={0} />
         </ButtonsGroup>

      </div>
  	</header>
);
      

export default Header;