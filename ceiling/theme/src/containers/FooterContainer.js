import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from './../components/Logo';
import Contacts from './../components/Contacts';
import ButtonsGroup from './../components/ButtonsGroup';


import NavContainer from './NavContainer.js'; 
import QuestionFormContainer from './QuestionFormContainer';
import SearchContainer from './SearchContainer';
import CallbackButtonContainer from './CallbackButtonContainer';
import OrderButtonContainer from './OrderButtonContainer';

import getClass from './../constants/classes';
import {cartPositions} from './../constants/cart';
import { getDeleteProductArguments, notFollow } from './../constants/pureFunctions';

import {openCallback} from './../actions/callback';
import {openOrder} from './../actions/order';

class  FooterContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    addressHref: PropTypes.string.isRequired
  }


  render() {
    const {
      isCartOpened
    } = this.props;

    return (
      <footer className={getClass({b: 'footer'})}>
          <QuestionFormContainer />
          <div className={getClass({b: 'container', m: "footer", add: "parent row v-centered h-around"})}>
      			<div className={getClass({b: 'firstFooterBlock',  add: "parent column h-around baseChild"})}>
      				 <SearchContainer searchName="footerSearch" modifier="footer" />
      				 <ButtonsGroup className="baseChild" modifier="footer">
      				   <CallbackButtonContainer  />
      				   <OrderButtonContainer 
                   cartPosition={cartPositions.footer}
                   cartModifier="hover_up"
      				    />
      				 </ButtonsGroup>
      			</div>

             <NavContainer isFooter={true} modifier="footer" className="baseChild" />
             <div className={getClass({b: 'thirdFooterBlock',  add: "parent column v-centered h-around baseChild"})}>
		            <Logo maxWidth={65} modifier="footer"/>
		            <Contacts 
		                {...this.props}
                    modifier="footer"
		            />
			       </div>
          </div>
          <div className={getClass({b: "copyright", add: "parent column centered"})}> 
              <p className={getClass({b: "copyright", el: "paragraph", add: "centeredText"})}>&copy;2018&nbsp;ArtCeil<br/> 
Созданно&nbsp;с&nbsp;поддержкой&nbsp;потолочных&nbsp;систем</p>
              <p className={getClass({b: "copyright", el: "paragraph", add: "centeredText"})}>
                  Дизайн и разработка: <a onClick={notFollow} className={getClass({b: "copyright", el: "paragraph", m: "refer", add:"reverse"})} href="https://shining-present.ru">Филипп Журавлёв</a>
              </p>
          </div>
        </footer>
    );
  }
}



const mapStateToProps = state => {
  return {};
}
      

export default connect(mapStateToProps)(FooterContainer);