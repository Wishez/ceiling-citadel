import _styles from '../index.sass'

export const composeClasses = (block, element, modifier) => {
	let composedClasses = {};

	composedClasses.b = block;
	if  (element)
		composedClasses.el = element;
	if (modifier)
		composedClasses.m = modifier;

	return composedClasses;		
};

function getClass({
	b='', 
	el='', 
	m='', 
	add='',
	styles=_styles
}) {
	let additionalClasses = add
		.split(' ')
		.map(additionalClass => styles[additionalClass])
		.join(' ');
	
	b = b ? styles[b] : '';
	el = el ? styles[`${b}__${el}`] : '';
	
	if (el) 
		b = '';

	if (el && m) {
		m =  m ? styles[`${b}__${el}_${m}`] : '';
	} else if (b && m) {
		m =  m ? styles[`${b}_${m}`] : '';
	}
	return `${b} ${el} ${m} ${additionalClasses}`;
}

export default getClass;