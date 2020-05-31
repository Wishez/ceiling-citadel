import React from "react";
import Breadcrumbs  from "react-router-dynamic-breadcrumbs";
import getClass from "./../constants/classes";

const BradcrumbsContainer = ({
  routes,
  ...rest
}) => (
  <Breadcrumbs
    WrapperComponent={
      (props) => (
        <ul className="breadcrumbs baseChild parent row h-around v-start">
          {props.children}
        </ul>
      )
    }
    ActiveLinkComponent={(props) => <li className={getClass({ b: "breadcrumb", m: "active" })} >{props.children}</li>}
    LinkComponent={(props) => (
      <li className="breadcrumb">
        {props.children}
      </li>
    )}
    mappedRoutes={routes}
    {...rest}
  />
);

export default BradcrumbsContainer;
