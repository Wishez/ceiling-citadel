import React  from 'react';
import getClass from './../../constants/classes';
import {Link} from 'react-router-dom';

const Table = ({ 
  block,
  element,
  elementModifier,
  modifier,
  className,
  content,
  url,
  slug,
  onClick,
  isNotRoute,
  ...rest
}) => (
  <h3 className={`${getClass({b: block, el: element, m: elementModifier, add: 'lowCascadingShadow upper centeredText'})} ${getClass({b: 'table', m: modifier, add: `${className} parent centered row` })}`}>
    {isNotRoute ? 
      <a className={getClass({b: 'table', el: 'refer', m: modifier, add: 'parent row centered'})} 
        href={`${url}${slug}/`}
        onClick={onClick}
      >
        {content}
      </a> :
      <Link className={getClass({b: 'table', el: 'refer', m: modifier, add: 'parent row centered'})} 
        to={`${url}${slug}/`}
        onClick={onClick}
      >
        {content}
      </Link>
    }
  </h3>
);

export default Table;
