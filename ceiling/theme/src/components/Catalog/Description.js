import React  from 'react';
import getClass from './../../constants/classes';
import {Link} from 'react-router-dom';

const Description = ({ 
  block,
  element,
  elementModifier,
  children,
  modifier,
  className,
  content,
  url,
  ...rest
}) => (
  <p className={`${getClass({b: 'catalogDescription', m: modifier, add: className })} ${getClass({b: block, el: element, m: elementModifier, add: 'parent row centered zeroVerticalMargin'})}`}>
    <span class="cropedText cropedText_5">
      {content}
    </span>
	 	{children}
	 	<Link to={url} className={getClass({
      b: 'moreRefer',
      m: modifier,
      add: 'parent row centered zeroVerticalMargin'
    })}>Подробнее</Link>
  </p>
);

export default Description;
