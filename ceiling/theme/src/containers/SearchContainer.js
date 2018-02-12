import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Search from './../components/Search';
import {localData} from './../constants/catalog';
import getClass from './../constants/classes';

import {
  fetchCatalogAndFindEntitiesIfNeeded,
  dumpEntitiesForSearch,
  cleanSearchEntities
} from './../actions/catalog';

class SearchContainer extends Component {
  static propTypes = { 
      dispatch: PropTypes.func.isRequired,
      searchName: PropTypes.string.isRequired,
      searchEntities: PropTypes.array.isRequired,
      isFinding: PropTypes.bool.isRequired,
      SearchForm: PropTypes.object
  }
  state = {
    lastValue: ''
  }
  componentDidMount() {
    const {searchName} = this.props;
    
    if (searchName === "headerSearch") {
      dumpEntitiesForSearch()
    }
  }
  submitSearch = (values, dispatch) => {
    console.log(values);
  }

  searchEntity = (values) => {
    const {
      searchName, 
      searchEntities,
      SearchForm,
      dispatch
    } = this.props;
    if ('active' in SearchForm && searchName === SearchForm.active) {
      const currentValue = values[searchName];

      console.log(SearchForm, currentValue);
      if (typeof currentValue !== 'undefined') {
        dispatch(fetchCatalogAndFindEntitiesIfNeeded(currentValue));
      } else {
        if (searchEntities.length) {
          console.log('clean state')
          dispatch(cleanSearchEntities());
        }
      }
    }
        
  }

  render() {
    const {searchEntities} = this.props;

    return (
      <div className={getClass({
            b: 'searchBlock',
      })}>
        <Search {...this.props}
          submitSearch={this.submitSearch}
          onChange={this.searchEntity}
        />
        {searchEntities.length ? 
          <section className={getClass({
            b: 'result',
          })}>
            {searchEntities.map((section, key) => (
                <article className={getClass({
                    b: 'resultSection',
                  })} key={key}>
                  <h2 className={getClass({
                    b: 'resultSection',
                    el: 'title'
                  })}>{section.name}</h2>
                  <ul>
                      {section.items.map((item, index) => (
                        <li className="" key={index}>
                          <a href={item.url} 
                            className={getClass({
                                b: 'resultRefer'
                          })}>
                            {item.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </article>
            ))}
          </section> : ''}
      </div>
    );
  }
}


const mapStateToProps = state => {
  const {catalog, form} = state;
  
  const {
    searchEntities,
    isFinding
  } = catalog;

  const {SearchForm} = form;

  return {
    searchEntities,
    isFinding,
    SearchForm
  };
}

export default withRouter(connect(mapStateToProps)(SearchContainer));