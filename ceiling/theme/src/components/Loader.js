import React from 'react';
import loader from './../images/icons/loader.svg';
import Figure from './../components/Figure';

const Loader = ({
	...rest
}) => (
	<Figure url={loader} maxWidth={50} />
);


export default Loader;