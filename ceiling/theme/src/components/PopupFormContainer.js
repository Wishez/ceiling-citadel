import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import CloseButton from './CloseButton';
import { Transition } from 'react-transition-group';

const defaultStyle = {
  opacity: 0,
  zIndex: -1000
};

const transitionStyles = {
  entering: { 
    opacity: 0, 
    zIndex: 1000
  },
  entered: { 
    opacity: 1,
    zIndex: 1000 
  },
};

const PopupFormContainer = ({
  block='popupFormContainer', 
  modifier='',
  children,
  className,
  closeButton,
  signification,
  opacity=0,
  in: inProp,
  duration=300,
  ...rest
}) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div style={{
        ...defaultStyle,
        transition: `opacity ${duration}ms ease-in-out, z-index ${duration}ms ease-in-out`,
        ...transitionStyles[state]
      }} 
      className={getClass({b: 'popupBackground', add: `${!inProp ? 'visible-hidden' : ''} parent row centered`})}>
        <section className={getClass(composeClasses(block, '', modifier, `popupFormContainer ${className}`))}>
          <h2 className={getClass({b: block, el: 'title', add: 'popupFormContainer__titleupper '})}>{signification}</h2>
          <CloseButton {...closeButton} />
          {children}
        </section>
      </div>
    )}
  </Transition>
);


export default PopupFormContainer;
