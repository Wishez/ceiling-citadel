import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getClass from './../constants/classes';
import QuestionForm from './../components/QuestionForm';
import Figure from './../components/Figure';
import maria from './../images/callback/masha.png';
import { 
  tryAskQuestion
} from './../actions/callback';

import Loader from './../components/Loader';
import ReactHtmlParser from 'react-html-parser';

class QuestionFormContainer extends Component {
  static propTypes = { 
      dispatch: PropTypes.func.isRequired,
      helpText: PropTypes.string.isRequired,
      isOrderedCallback: PropTypes.bool.isRequired,
      isRequesting: PropTypes.bool.isRequired
  }

  submitQuestion = (values, dispatch) => {

    dispatch(tryAskQuestion(values));
  }


  render() {
    const { helpText, isAskedQuestion, isRequesting } = this.props;

    return (
      <div className={getClass({b: 'questionFormContainer'})}>

        <h2 className={getClass({b: 'questionFormContainer', el: "title"})}>задайте вопрос маше</h2>
        <div className={getClass({b: 'container',  add: "parent row v-centered h-around"})}>
          <Figure url={maria} maxWidth={210} />
          {!isAskedQuestion ? 
            <QuestionForm buttonOptions={{ 
                content: !isRequesting ? "Спросить" : <Loader />,
              }}
              onSubmit={this.submitQuestion} 
              helpText={helpText.toString()}
              block="askQuestion"
            /> :
            <p className={getClass({b: "successfull"})}>{ReactHtmlParser(helpText)}</p>
          }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { callback } = state;
  
  return {
    ...callback
  };
};

export default connect(mapStateToProps)(QuestionFormContainer);