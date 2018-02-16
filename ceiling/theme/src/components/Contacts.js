import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import { notFollow } from './../constants/pureFunctions';
import Figure from './Figure';
import phoneIcon from './../images/icons/phone.png';
import addressIcon from './../images/icons/visit_card.png';
import emailIcon from './../images/icons/envelope.png';

const Contacts = ({
  block, 
  modifier,
  email,
  phone,
  address,
  addressHref,
  children
}) => (  
  <ul className={getClass(composeClasses('contacts', '', modifier, 'baseChild'))}>
    <li className={getClass({b:'contactsItem', add:'parent row v-centered'})}
    	itemScope 
    	itemType="https://schema.org/ContactPoint"
    >

      {/*<span className={`visible-hidden-xs ${getClass({b: 'contactsItem', el: 'label'})}`}>E-mail: </span>*/}
      <Figure url={emailIcon} name="email" maxWidth={25} />

      <a href={`mailto:${email}`}
        className={getClass({b: 'contactsItem', el: 'contact'})}>
        {email}
      </a>
    </li>	
    <li className={getClass({b: 'contactsItem', add:'parent row v-centered'})}
    	itemScope 
    	itemType="https://schema.org/ContactPoint"
    >
	    {/*<span className={`visible-hidden-xs ${getClass({b: 'contactsItem', el: 'label'})}`}>Телефон:</span>*/}
      <Figure url={phoneIcon} name="phone" maxWidth={25} />
      <a href={`tel:${phone}`}
        className={getClass({b: 'contactsItem', el: 'contact'})}>
        {phone}
      </a>
    </li>
    {address ? 
	    <li className={getClass({b: 'contactsItem', add:'parent row v-centered'})}
	    	itemScope 
	    	itemType="https://schema.org/ContactPoint"
	    >
        <Figure url={addressIcon} name="address" maxWidth={25} />
		    {/*<span className={`visible-hidden-xs ${getClass({b: 'contactsItem', el: 'label'})}`}>Адрес: </span>*/}
	          <a href={addressHref}
	             className={getClass({b: 'contactsItem', el: 'contact'})}
	             onClick={notFollow}>
	         	{address}
	          </a>	
	    </li> : ''}
  </ul>
);

export default Contacts;
