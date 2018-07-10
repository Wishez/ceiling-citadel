import React  from "react";
import getClass from "./../../constants/classes";
import {Link} from "react-router-dom";

const Description = ({
  block,
  element,
  elementModifier,
  children,
  modifier,
  className,
  content,
  url,
  changePage,
  ...rest
}) => (
  <p className={`${getClass({b: "catalogDescription", m: modifier, add: className })} ${getClass({b: block, el: element, m: elementModifier, add: "parent row h-centered paragraph_container itemPresentation"})}`}>
    <span className="cropedText cropedText_5 max-width_paragraph padding-top_base">
      {content}
    </span>
	 	{children}
	 	<Link to={url} className={getClass({
      b: "moreRefer",
      m: modifier,
      add: "parent row centered zeroVerticalMargin"
    })}
    onClick={changePage}
    >Подробнее</Link>
  </p>
);

export default Description;
