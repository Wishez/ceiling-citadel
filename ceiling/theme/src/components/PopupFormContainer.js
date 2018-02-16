import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';

const PopupFormContainer = ({
  block='popupFormContainer', 
  modifier='',
  children,
  className,
  closeButton,
  signification,
  ...rest
}) => (
  <div className={getClass({b: 'popupBackground', add: 'parent row centered'})}>
    <section className={getClass(composeClasses(block, '', modifier, `popupFormContainer ${className}`))}>
      <h2 className={getClass({b: block, el: 'title', add: 'popupFormContainer__titleupper '})}>{signification}</h2>
      <CloseButton {...closeButton} />
      {children}
    </section>
  </div>
);


export default PopupFormContainer;
