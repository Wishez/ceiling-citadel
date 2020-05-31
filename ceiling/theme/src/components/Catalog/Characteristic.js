import React from "react";
import getClass from "./../../constants/classes";

const Characteristic = ({
  label,
  value,
  children,
  name,
  className,
}) => (
  <div className={getClass({
    b: "sampleCharacteristic",
    m: name,
    add: `parent row zeroVerticalMargin ${className || ""}`,
  })}
  >
    <span className={getClass({
      b: "sampleCharacteristic",
      el: "label",
      m: name,
    })}
    >
      {`${label}:`}
    </span>&thinsp;

    {value ?
      <span className={getClass({
        b: "sampleCharacteristic",
        el: "characteristic",
        m: name,
        add: "zeroVerticalMargin",
      })}
      >
        {value}
      </span>
      : ""}

    {children}
  </div>
);


export default Characteristic;
