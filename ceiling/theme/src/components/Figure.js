import React from 'React';

const Figure = ({
	block,
	url,
	width,
	height,
	maxWidth
}) => (
	<div className={`imageContainer ${block}ImageContainer`}
		style={{
			maxWidth: `${maxWidth}px`
		}}
	>
		<figure
			className={`imageContainer__image ${block}ImageContainer__image`}
			style={{
				backgroundImage: `url(${url})`,
				paddingBottom: `${height / width * 100}%`
			}} />
	</div>
);

export default Figure;