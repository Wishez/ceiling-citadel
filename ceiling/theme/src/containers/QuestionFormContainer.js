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
    isAskedQuestion: PropTypes.bool.isRequired,
    isRequesting: PropTypes.bool.isRequired
  }

  submitQuestion = (values, dispatch) => {

    dispatch(tryAskQuestion(values));
  }


  render() {
    const { helpText, isAskedQuestion, isRequesting } = this.props;

    return (
      <section className={getClass({b: 'questionFormSection'})}>

        <h2 className={getClass({b: 'questionFormSection', el: 'title', add: 'upper parent row centered'})}>задайте вопрос маше</h2>
        <div className={getClass({b: 'questionFormContainer', add: 'container parent row centered'})}>
          <Figure url={maria} maxWidth={280} name="maria" />
          {!isAskedQuestion ? 
            <QuestionForm buttonOptions={{ 
              content: !isRequesting ? 'Спросить' : <Loader />,
            }}
            onSubmit={this.submitQuestion} 
            helpText={helpText.toString()}
            block="questionForm"
            /> :
            <p className={getClass({b: 'askedSuccessfull', add: 'parent row centered'})}>{ReactHtmlParser(helpText)}</p>
          }
        </div>
      </section>
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
