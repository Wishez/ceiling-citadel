import React  from 'react';
import getClass from './../../constants/classes';
import {TransitionGroup } from 'react-transition-group';

const CatalogSubsection = ({
  modifier,
  children,
  name,
  titleShown=true,
  className,
  headerId,
}) => (
  <div className={getClass({b: 'catalogSubsection', m: modifier, add: `${className ? className : ''}` })}>
    <h3 id={headerId} className={
      getClass({
        b: 'catalogSubsection',
        el: 'title',
        m: modifier,
        add: titleShown ? '' : 'visible-hidden'
      })
    }>
      {name}
    </h3>
    <TransitionGroup className="fullWidth parent row centered">
      {children}
    </TransitionGroup>
  </div>
);

export default CatalogSubsection;
