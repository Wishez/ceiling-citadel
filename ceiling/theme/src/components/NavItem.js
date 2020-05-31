import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import getClass from "./../constants/classes";

const NavItem = ({
  block,
  href,
  name,
  children,
}) => (
  <Link
    to={href}
    className={`${block}__refer baseChild unstyledLink`}
  >
    {name}
    {ReactHtmlParser(children)}
  </Link>
);

export default NavItem;
