import React  from "react";
import { Link } from "react-router-dom";
import getClass from "./../../constants/classes";

const Table = ({
  block,
  element,
  elementModifier,
  modifier,
  className,
  content,
  url,
  slug,
  onClick,
  isNotRoute,
  ...rest
}) => (
  <h3 className={`${getClass({ b: block, el: element, m: elementModifier, add: "lowCascadingShadow upper text_centered" })} ${getClass({ b: "table", m: modifier, add: `${className || ""} parent centered row` })}`}>
    <Link
      className={getClass({ b: "table", el: "refer", m: modifier, add: "parent row centered unstyledLink productIndicator" })}
      to={`${url}${slug}/`}
      onClick={onClick}
    >
      {content}
    </Link>
  </h3>
);

export default Table;
