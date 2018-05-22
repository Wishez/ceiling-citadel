import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getClass, {composeClasses} from './../constants/classes';
import brand from './../images/logo.png';
import Figure from './Figure';

const Logo = ({
  modifier,
  maxWidth
}) => (
  	<Link to='/' className={getClass(composeClasses('brand', '', modifier, 'baseChild parent row h-between unstyledLink'))}>
  		<Figure name="brand"
  			maxWidth={maxWidth}
  			url={brand}
  			className="baseChild"
  			modifier={modifier}
  		/>
  		<hgroup className={getClass({b: 'centeredText', add: ''})}>
      <h1 className={getClass(composeClasses('brand', 'name', modifier, 'baseChild'))}>
        <span className={getClass({b: 'cian'})}>Art</span>
        <span className={getClass({b: 'orange'})}>Ceil</span>
        <span className={getClass({b: 'darkBlue'})}>.</span>
      </h1>
      <h2 className={`${getClass({b: 'brand', el: 'slogan', m: modifier})} ${getClass({b: 'darkBlue'})}`}>
				Цитадель потолочных покрытий
      </h2>
  		</hgroup>
  </Link>
);

export default Logo;
