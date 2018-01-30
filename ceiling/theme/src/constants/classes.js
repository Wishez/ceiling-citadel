import _styles from '../index.sass'

export const composeClasses = (block, element, modifier, additionalClasses) => {
	let composedClasses = {};

	composedClasses.b = block;

	if  (element) {
		composedClasses.el = element;
	}

	if (modifier) {
		composedClasses.m = modifier;
	}

	if (additionalClasses) {
		composedClasses.add = additionalClasses;
	}

	return composedClasses;		
};

const toCapitalize = str =>  str.charAt(0).toUpperCase() + str.slice(1);

function getClass({
	b='', 
	el='', 
	m='', 
	add='',
	styles=_styles
}) {
	const elementClass =  `${b}__${el}`;
	const blockClass = b;

	if (add.indexOf(' ') !== -1) {
		add = add
			.split(' ')
			.map(additionalClass => additionalClass in styles ? styles[additionalClass] : '')
			.join(' ');
	} else {
		add = add in styles ? styles[add] : '';
	}
	b = blockClass in styles ? styles[blockClass] : '';
	el = elementClass in styles  ? styles[elementClass] : '';
	
	
	if (el)  {
		b = '';
	}

	if (el && m) {
		m =  m ? styles[`${elementClass}_${m}`] : '';
	} else if (b && m) {
		m =  m ? styles[`${blockClass}_${m}`] : '';
	}
	return [b, el, m, add]
		.filter(filteredClass => filteredClass)
		.join(" ");
}

export default getClass;