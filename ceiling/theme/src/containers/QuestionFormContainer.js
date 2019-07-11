import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import QuestionForm from "@/components/QuestionForm";
import Figure from "@/components/Figure";
import Loader from "@/components/Loader";

import maria from "@/images/callback/masha.png";

import {tryAskQuestion} from "@/actions/callback";

class QuestionFormContainer extends PureComponent {
  static propTypes = {
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
      <section className='questionFormSection'>

        <h2 className='questionFormSection__title textCentered_xxs upper parent row centered materialCascadingShadow'>
          задайте вопрос маше</h2>
        <div className='questionFormContainer container parent row centered'>
          <Figure url={maria} maxWidth={280} name="maria" />

          {!isAskedQuestion ?
            <QuestionForm
              buttonOptions={{
                content: !isRequesting ?
                  "Спросить"
                  : <Loader />,
              }}
              onSubmit={this.submitQuestion}
              helpText={helpText.toString()}
              block="questionForm"
            />
            : <p className='askedSuccessfull parent row centered'>
              {ReactHtmlParser(helpText)}
            </p>
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
