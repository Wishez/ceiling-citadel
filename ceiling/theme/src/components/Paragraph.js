import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import getClass from './../constants/classes';

const Paragraph = ({ 
  text,
  block,
  children,
  modifier,
  className,
  ...rest 
}) => (	
  <p className={getClass({
    b: block, 
    el: 'paragraph', 
    m: modifier, 
    add: `${className}`
  })}>
    { ReactHtmlParser(text) }
    {children}
  </p>
);

export default Paragraph;
