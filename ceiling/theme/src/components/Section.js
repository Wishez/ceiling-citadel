import React  from 'react';

import { Image, Container } from 'semantic-ui-react';
import Paragraph from './Paragraph';

const Section = ({ 
	block,
	children
}) => (
	<section className={`${block} section`}>
		<Container>
		 	{children}
		</Container>
	</section>
);

export default Section;