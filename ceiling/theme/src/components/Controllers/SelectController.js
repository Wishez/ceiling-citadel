import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ActionLabel from "material-ui/svg-icons/av/stop";
import ReactHtmlParser from "react-html-parser";
import getClass from "./../../constants/classes";
import Figure from "./../Figure";

const SelectController = ({
  input,
  meta: {
    touched,
    error,
    warning,
  },
  block = "controller",
  options,
  onChangeSelect,
  modifier,
  label,
  className,
  iconOptions,
  style,
  hintText,
  ...rest
}) => (
  <div
    style={style || {}}
    className={getClass({
      b: block,
      m: modifier,
      add: `${className}`,
    })}
  >
    {label ?
      <label className={getClass({
        b: block,
        el: "label",
        m: modifier,
        add: "baseChild",
      })}
      >
        {label}
      </label> : ""}
    {iconOptions ?
      <Figure
        block="controllerIcon"
        className="baseChild"
        {...iconOptions}
      /> : ""}
    <SelectField
      {...input}
      className={getClass({ b: "controller", el: "input", m: "select" })}
      onChange={onChangeSelect(input)}
      hintText={hintText}
      value={input.value}

    >
      {options.map((option, index) => {
        const menuItemOptions = {
          key: index,
          value: option.value,
          primaryText: option.text,
          className: getClass({
            b: "controller",
            el: "option",
            m: modifier }
          ),
        };

        if ("showIcon" in option) {
          menuItemOptions.leftIcon = <ActionLabel color={option.color} />;
        }

        return (<MenuItem {...menuItemOptions} />);
      })}
    </SelectField>
    {touched &&
		 	((error &&
  <span className={getClass({
		 		  b: block,
		 		  el: "error",
		 		})}
  >{error}</span>) ||
		 		(warning && <span className={getClass({
		 		  b: block,
		 		  el: "error",
		 		})}
		 		>{warning}</span>))}
  </div>
);


export default SelectController;
