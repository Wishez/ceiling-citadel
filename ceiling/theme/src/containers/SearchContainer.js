import React, { PureComponent } from "react";
import {Link} from "react-router-dom";

import PropTypes from "prop-types";

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Search from "./../components/Search";

import getClass from "@/constants/classes";
import {timer} from "@/constants/pureFunctions";

import {
  findEntitiesAndShowResults,
  cleanSearchEntities
} from "./../actions/catalog";

class SearchContainer extends PureComponent {
  static propTypes = {
    searchedEntities: PropTypes.array.isRequired,
    isFinding: PropTypes.bool.isRequired,
    SearchForm: PropTypes.object
  }

  state = {
    isEntitiesListShown: false,
    searchValue: ""
  }


  setSearchValue = (searchValue) => {
    this.setState({ searchValue });
  }

  componentWillUpdate(nextProps) {
    const {searchedEntities: nextSearchEntities} = nextProps;
    const {isEntitiesListShown: isEntitiesListShownNow} = this.state;
    const entitesLength = nextSearchEntities.length;

    if (!isEntitiesListShownNow && entitesLength) {
      this.showEntitiesList();
    } else if (isEntitiesListShownNow && !entitesLength) {
      this.hideEntitiesList();
    }
  }


  showEntitiesList = () => {
    const { enitiesList } = this.refs;

    anime({
      targets: enitiesList,
      opacity: 0.9,
      translateY: 0,
      duration: 250,
      elasticity: 100,
      begin: () => {
        this.setState({
          isEntitiesListShown: true,
          lastUpdate: new Date()
        });
      }
    });
  }

  hideEntitiesList = () => {
    const { enitiesList } = this.refs;

    anime({
      targets: enitiesList,
      opacity: {
        value: 0,
        duration: 100
      },
      translateY: "-1rem",
      duration: 250,
      elasticity: 100,
      complete: () => {
        this.setState({
          isEntitiesListShown: false
        });
      }
    });
  }

  render() {
    const { props, state } = this;
    const { searchedEntities, modifier, searchEntities } = props;
    const { isEntitiesListShown, searchValue } = state;

    return (
      <div className={getClass({
        b: "searchBlock",
        m: modifier
      })}>
        <Search {...props}
          submitSearch={searchEntities}
          onChange={timer(searchEntities, 500)}
        />

        {(isEntitiesListShown || searchedEntities.length) && searchValue ?
          <section ref='enitiesList'
            className="position_absolute fewRound lowCascadingShadow result opacity_9">
            {searchedEntities.map((section, key) => (
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
          </section> : ""}
      </div>
    );
  }
}

const mergeProps = (stateProps, dispatch, ownProps) => ({
  ...ownProps,
  ...stateProps,

  searchEntities: (values) => {
    const {
      searchName,
      searchedEntities,
      SearchForm,
    } = stateProps;
  
    if ("active" in SearchForm && searchName === SearchForm.active) {
      const currentValue = values[searchName];
      this.setSearchValue(currentValue);
  
      if (typeof currentValue !== "undefined") {
        dispatch(findEntitiesAndShowResults(currentValue));
      } else {
        if (searchedEntities.length > 0) {
          dispatch(cleanSearchEntities());
        }
      }
    }
  },
});

const mapStateToProps = state => {
  const { catalog, form } = state;
  const { searchedEntities, isFinding } = catalog;
  const {SearchForm} = form;
  return { searchedEntities, isFinding, SearchForm };
};

export default withRouter(connect(mapStateToProps, null, mergeProps)(SearchContainer));
