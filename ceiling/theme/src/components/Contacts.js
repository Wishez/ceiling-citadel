import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import { notFollow } from './../constants/pureFunctions';


const Contacts = ({
	block, 
	modifier,
	email,
	phone,
	address,
	addressHref
}) => (  
  <ul className={getClass(composeClasses('contacts', '', modifier, 'baseChild'))}>
    <li className={getClass({b:"contactsItem"})}
    	itemScope 
    	itemType="https://schema.org/ContactPoint"
    >

		<span className={getClass({b: "contactsItem", el: 'label'})}>E-mail: </span>
		<a href={`mailto:${email}`}
		className={getClass({b: "contactsItem", el: 'contact'})}>
			{email}
		</a>
    </li>	
	<li className={getClass({b: "contactsItem"})}
    	itemScope 
    	itemType="https://schema.org/ContactPoint"
    >
	    <span className={`visible-hidden-xs ${getClass({b: "contactsItem", el: 'label'})}`}>Телефон:</span>
		<a href={`tel:${phone}`}
			className={getClass({b: "contactsItem", el: 'contact'})}>
			{phone}
		</a>
    </li>
    {address ? 
	    <li className={getClass({b: "contactsItem"})}
	    	itemScope 
	    	itemType="https://schema.org/ContactPoint"
	    >
		    <span className={`visible-hidden-xs ${getClass({b: "contactsItem", el: 'label'})}`}>Адрес: </span>
	          <a href={addressHref}
	             className={getClass({b: "contactsItem", el: 'contact'})}
	             onClick={notFollow}>
	         	{address}
	          </a>	
	    </li> : ''}

  </ul>
);

export default Contacts;