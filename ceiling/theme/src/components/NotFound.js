import React from 'react';
import { Link } from 'react-router-dom';

import Section from './Section';
import Title from './Title';

const NotFound = ({  }) => (	
	<Section block='notFound'>
		<Title block='notFound'
			text='В разработке&hellip;' />
		<Link to='/'>На главную</Link>
	</Section>
);

export default NotFound;