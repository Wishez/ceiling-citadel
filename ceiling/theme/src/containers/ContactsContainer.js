import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ReactHtmlPareser from "react-html-parser";

import Figure from "./../components/Figure";
import Contacts from "./../components/Contacts";

import getClass from "./../constants/classes";
import yoda from "./../images/icons/contacts.png";

import { selectNavigationItem } from "./../actions/navigationActions.js"; 

import { initNavigationState } from "./../reducers/navigation.js";

import CallbackButtonContainer from "./CallbackButtonContainer";



class ContactsContainer extends PureComponent {
	static propTypes = {
	  email: PropTypes.string.isRequired,
	  phone: PropTypes.string.isRequired,
	  address: PropTypes.string.isRequired,
	  addressHref: PropTypes.string.isRequired,
	  map: PropTypes.string.isRequired
	}
	
	componentDidMount() {
	  const { dispatch } = this.props;
	  dispatch(selectNavigationItem(initNavigationState.fourthNavItem.index));
	  if (!document.title)
	  		document.title = "Контакты | ArtCeil";
	}

	render() {
	  const {map} = this.props;
	  return (
	    <section className={getClass({b: "container", m: "main", add: "parent column centered contactsSection"})}>
	      <h1 className={getClass({b: "contactsSection", el: "title", add: "parent row centered"})}>
					Всегда на связи мы
	        <Figure name="contacts" url={yoda} maxWidth={74} />
	      </h1>
	      <Contacts {...this.props} modifier="topMaring"/>
	      <CallbackButtonContainer modifier="stretched" />
	      <article className={getClass({b: "map"})}>
	        <h2 className={getClass({b: "map", el: "title"})}>Карта проезда</h2>
	        {ReactHtmlPareser(map)}
	      </article>
	    </section>
	  );
	}
}

const mapStateToProps = state => {
  const {app} = state;
  const {
    email,
    phone,
    address,
    addressHref,
    map
  } = app;

  return {
    email,
    phone,
    address,
    addressHref,
    map
  };
};

export default withRouter(connect(mapStateToProps)(ContactsContainer));
