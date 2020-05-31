import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Figure from "./../components/Figure";

import getClass from "./../constants/classes";
import service from "./../images/icons/service.png";

import { selectNavigationItem } from "./../actions/navigationActions.js";
import { initNavigationState } from "./../reducers/navigation.js";

import Paragraph from "./../components/Paragraph";
/*eslint-disable max-len */
class ContactsContainer extends PureComponent {
  componentDidMount() {
    this.props.onPageLoaded();

    if (!document.title) document.title = "Сервис | ArtCeil";
  }

  render() {
    return (
      <section className={getClass({ b: "container", m: "main", add: "parent column centered serviceSection" })}>
        <h1 className={getClass({ b: "serviceSection", el: "title", add: "parent row centered" })}>
          Сервис
          <Figure name="service" url={service} maxWidth={71} />
        </h1>


        <article className={getClass({ b: "deploy" })}>
          <h2 className={getClass({ b: "deploy", el: "title" })}>Монтаж</h2>
          <Paragraph block="deploy" text={"У нас есть профессиональная команда, устанавливающая потолки в разнообразных и необычных местах."} />
          <Paragraph block="deploy" text={"Каждый член команды — квалифицированный специалист, всегда готовый прийти  к вам  на помощь и разобраться с не установленным потолком, или его недостающими  частями!"} />
        </article>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onPageLoaded: () => {
    dispatch(selectNavigationItem(initNavigationState.thirdNavItem.index));
  },
});

export default withRouter(connect(null, mapDispatchToProps)(ContactsContainer));
