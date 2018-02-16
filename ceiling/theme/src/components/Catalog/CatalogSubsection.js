import React  from 'react';
import getClass from './../../constants/classes';

const CatalogSubsection = ({ 
  block,
  modifier,
  children,
  name,
  titleShown=true,
  className,
  headerId,
  ...rest
}) => (
  <div className={getClass({b: 'catalogSubsection', m: modifier, add: `${className} parent row centered` })}>
    <h3 id={headerId} className={getClass({b: 'catalogSubsection', el: 'title', m: modifier, add: titleShown ? '' : 'visible-hidden' })}>
      {name}
    </h3>
	 	{children}
  </div>
);

export default CatalogSubsection;
