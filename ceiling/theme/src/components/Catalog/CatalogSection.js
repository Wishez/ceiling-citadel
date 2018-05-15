import React  from 'react';
import getClass from './../../constants/classes';
import {TransitionGroup } from 'react-transition-group';

import Loader from './../Loader';


const CatalogSection = ({
  block,
  modifier='',
  children,
  name,
  titleShown=true,
  className,
  headerId,
  fallback='',
  ...rest
}) => (
  <section className={getClass({b: 'catalogSection', m: modifier, add: `${className} lowCascadingShadow` })}>
    <h2 key="heading" id={headerId} className={getClass({b: 'catalogSection', el: 'title', m: modifier, add: titleShown ? '' : 'visible-hidden' })}>
      {name}
    </h2>
    <TransitionGroup className="fullWidth parent row centered">
      {children}
    </TransitionGroup>
    {children ? '' :
      fallback ?
        fallback :
        <div className="fullWidth parent row centered">
          <Loader />
        </div>}
  </section>
);

// </TransitionGroup>
// <TransitionGroup>
export default CatalogSection;
