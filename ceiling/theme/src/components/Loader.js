import React from 'react';
import loader from './../images/icons/loader.svg';
import Figure from './../components/Figure';

const Loader = ({
  ...rest
}) => (
  <Figure name="loader" url={loader} maxWidth={65} {...rest} />
);


export default Loader;
