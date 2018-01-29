import React from 'react';
import Slider from 'react-slick';
import Section from './Section';

const MainSlider = ({
	...rest,
	images
}) => (
    <Section block='topSlider'>
		<Slider className='mainSlider'
			{...rest}>
			{
				images.map((url, index) => (
					<figure key={index}
						style={{
							backgroundImage: `url(${url})`
						}}
						className='mainSlider__slide'
					/>
				))
			}
		</Slider>
	</Section>
);

export default MainSlider;