import React  from 'react';
import getClass from './../../constants/classes';
import {TransitionGroup } from 'react-transition-group';


const CatalogSection = ({ 
  block,
  modifier='',
  children,
  name,
  titleShown=true,
  className,
  headerId,
  ...rest
}) => (
  <section className={getClass({b: 'catalogSection', m: modifier, add: `${className}` })}>
    <h2 key="heading" id={headerId} className={getClass({b: 'catalogSection', el: 'title', m: modifier, add: titleShown ? '' : 'visible-hidden' })}>
      {name}
    </h2>
    <TransitionGroup className="fullWidth parent row centered">
      {children}
    </TransitionGroup>
  </section>
);

// </TransitionGroup>
// <TransitionGroup>
export default CatalogSection;
