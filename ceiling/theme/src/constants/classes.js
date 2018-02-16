import _styles from '../index.sass';

export const composeClasses = (block, element, modifier, additionalClasses) => {
  let composedClasses = {};

  composedClasses.b = block;

  if (element) {
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

const toCapitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function getClass({
  b='', 
  el='', 
  m='', 
  add='',
}) {
  let elementClass = false;

  // if (add.indexOf(' ') !== -1) {
  //   add = add
  //     .split(' ')
  //     .map(additionalClass => additionalClass)
  //     .join(' ');
  // } else {
  //   add = add;
  // }
  //

  if (el) {
    elementClass = `${b}__${el}`;
    b = '';
  }

  if (elementClass && m) {
    m = `${elementClass}_${m}`;
  } else if (b && m) {
    m = `${b}_${m}`;
  }

  return [b, elementClass, m, add]
    .filter(filteredClass => filteredClass)
    .join(' ');
}

export default getClass;
