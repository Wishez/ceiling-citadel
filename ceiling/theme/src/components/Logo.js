import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getClass from './../constants/classes';

const Logo = ({}) => (
  	<a href='/' className="brand">
		<div className={getClass({b: "imageContainer", m: "brand"})}>
			<figure className="imageContainer__image imageContainer__image_brand">
			</figure>
		</div>
		<h1 className={getClass({b: 'brand', el: 'name'})}>
			<span className={getClass({b: 'cian'})}>Art</span>
			<span className={getClass({b: 'orange'})}>Ceil</span>
		</h1>
		<h2 className={`${getClass({b: "brand", el: "slogan"})} ${getClass({b: "darkBlue"})}`}>
			Цитадель потолочных покрытий
		</h2>
	</a>
);

export default Logo;