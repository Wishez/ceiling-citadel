import _styles from '../index.sass'


function getClass({
	b='', el='', m='', styles=_styles
}) {
	b = b ? styles[b] : b;
	el = el ? styles[`${b}__${el}`] : el;
	
	if (el) 
		b = '';

	if (el && m) {
		m =  m ? styles[`${b}__${el}_${m}`] : m;
	} else if (b && m) {
		m =  m ? styles[`${b}_${m}`] : m;
	}

	return `${b} ${el} ${m}`;
}

export default getClass;