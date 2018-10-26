import React from "react";
import SearchContainer from "./SearchContainer";
import NavContainer from "./NavContainer"; 
import OrderButtonContainer from "./OrderButtonContainer";
import CallbackButtonContainer from "./CallbackButtonContainer";
import Logo from "./../components/Logo";
import ButtonsGroup from "./../components/ButtonsGroup";
import { cartPositions } from "./../constants/cart";
import getClass from "./../constants/classes";


const HeaderContainer = (props) => {

  return (
    <header className={getClass({b: "header", add: "materialCascadingShadow"})}>
      <div className={getClass({b: "container", add: "parent row v-centered h-around"})}>
        <Logo maxWidth={65} modifier="header"/>

        <SearchContainer searchName="headerSearch" modifier="header" />

        <ButtonsGroup className="baseChild parent row" modifier="header">
          <CallbackButtonContainer {...props} />

          <OrderButtonContainer
            cartPosition={cartPositions.header}
            cartModifier="hover_bottom"
            modifier="header"
          />
        </ButtonsGroup>

        <NavContainer isStaticMenu />
      </div>
    </header>
  );
};

export default HeaderContainer;
