import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './../components/Search';


class SearchContainer extends Component {
  static propTypes = { 
      dispatch: PropTypes.func.isRequired
  }

  submitSearch = (values, dispatch) => {
    console.log(values);
  }


  render() {
    return (
      <Search {...this.props}
        submitSearch={this.submitSearch}
      />
    );
  }
}


const mapStateToProps = state => {
  
  return {};
}

export default connect(mapStateToProps)(SearchContainer);