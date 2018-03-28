import React from 'react';
import getClass from './../constants/classes';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

const NavItem = ({
  block, 
  href,
  name,
  children
}) => (  
  <Link to={href}
    className={`${block}__refer baseChild`}
  >
    {name}
    {ReactHtmlParser(children)}
  </Link>
);

export default NavItem;
