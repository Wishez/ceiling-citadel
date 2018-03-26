import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Search from './../components/Search';
import {CATALOG} from './../constants/catalog';
import getClass from './../constants/classes';

import {
  findEntitiesAndShowResults,
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

  searchEntity = (values) => {
    const {
      searchName, 
      searchEntities,
      SearchForm,
      dispatch
    } = this.props;

    if ('active' in SearchForm && searchName === SearchForm.active) {
      const currentValue = values[searchName];

      
      if (typeof currentValue !== 'undefined') {
        dispatch(findEntitiesAndShowResults(currentValue));
      } else {
        if (searchEntities.length) {
          dispatch(cleanSearchEntities());
        }
      }
    }
        
  }

  render() {
    const {
      searchEntities,
      modifier
    } = this.props;
    
    return (
      <div className={getClass({
        b: 'searchBlock',
        m: modifier
      })}>
        <Search {...this.props}
          submitSearch={this.searchEntity}
          onChange={this.searchEntity}
        />
        {searchEntities.length ? 
          <section className="result opacity_9">
            {searchEntities.map((section, key) => (
              <article className="resultSection"
                key={key}>
                <h2 className="resultSection__title">
                  {section.name}
                </h2>
                <ul>
                  {section.items.map((item, index) => (
                    <li key={index}>
                      <Link to={item.url} 
                        className='resultRefer'
                      >
                        {item.name}
                      </Link>
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
};

export default withRouter(connect(mapStateToProps)(SearchContainer));
