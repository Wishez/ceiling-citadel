import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getClass from './../constants/classes';
import brand from './../images/logo.png';
import Figure from './Figure';

const Logo = ({}) => (
  	<a href='/' className={getClass({b: "brand", add: "baseChild parent row h-between"})}>
  		<Figure name="brand" 
  			maxWidth={50}
  			url={brand} 
  			className="baseChild"
  		/>
  		<hgroup>
			<h1 className={getClass({b: 'brand', el: 'name', add: "baseChild"})}>
				<span className={getClass({b: 'cian'})}>Art</span>
				<span className={getClass({b: 'orange'})}>Ceil</span>
			</h1>
			<h2 className={`${getClass({b: "brand", el: "slogan"})} ${getClass({b: "darkBlue"})}`}>
				Цитадель потолочных покрытий
			</h2>
  		</hgroup>
	</a>
);

export default Logo;