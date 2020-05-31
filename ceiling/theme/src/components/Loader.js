import React from "react";
import loader from "./../images/icons/loader.svg";
import Figure from "./../components/Figure";

const Loader = ({
  ...rest
}) => (
  <Figure name="loader" aria-live="assertive" role="alert" url={loader} maxWidth={65} {...rest} />
);


export default Loader;
