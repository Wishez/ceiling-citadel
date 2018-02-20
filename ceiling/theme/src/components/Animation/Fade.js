import React from 'react';
import { Transition } from 'react-transition-group'

const duration = 300;
const opacity = 0;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: opacity
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
      
    )}
  </Transition>
);