import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Route} from 'react-router-dom'; 

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import { TransitionGroup } from 'react-transition-group'
import getClass from './../../constants/classes';
import CatalogPageContainer from './CatalogPageContainer';
import BrandContainer from './BrandContainer';
import CategoryContainer from './CategoryContainer';
import BrandCategoryContainer from './BrandCategoryContainer';
import ProductContainer from './ProductContainer';
import { tryFetchCatalog, fetchCatalogEntityOrGetLocale } from './../../actions/catalog';


import { selectNavigationItem } from './../../actions/navigationActions.js'; 
import { initNavigationState } from './../../reducers/navigation.js';

class CatalogRoutes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }
  componentDidMount() {
    const { dispatch } = this.props;

    // Перенести в отдельный компонент каталога.
    // const { pathname } = this.props.location;
    // dispatch(changeSteps(id, name, pathname));
    
    dispatch(selectNavigationItem(initNavigationState.secondNavItem.index));
    document.title = 'Каталог | ArtCeil'
  }

  receiveData = (name, id) => {
    const {dispatch} = this.props;
  }

  // componentWillReceiveProps(nextProps) {
  //   // const { match } = this.props;
  //   // const currentUrl = match.url;
  //   // const nextUrl = nextProps.match.url;
  

  // }

  render() {
    const { 
        match 
    } = this.props;
    const url = match.url;
    
    return (
      <section className={getClass({b: 'catalog'})}>
            <Route path={`${url}`} component={CatalogPageContainer} />
            <Route path={`${url}/brand/:brandSlug`} component={BrandContainer} />
            {/*<Route path={`${url}/brand-category/:categorySlug`} component={BrandCategoryContainer} />*/}
            <Route path={`${url}/category/:categorySlug`} component={CategoryContainer} />
            <Route path={`${url}/product/:productSlug`} component={ProductContainer} />
      </section>
    );
  }
}
// <TransitionGroup
//             component="div"
//             classNames={{
//               enter: getClass({b: 'translate', m: "enter"}),
//               enterActive: getClass({b: 'translate', m: "enterActive"}),
//               leave: getClass({b: 'translate', m: "leave"}),
//               leaveActive: getClass({b: 'translate', m: "leaveActive"})
//             }}
//             timeout={{
//                enter: 500,
//                exit: 500,
//             }}
//         >
          // </TransitionGroup>
const mapStateToProps = state => {
  const { catalog } = state;

  return {
    ...catalog
  }
};

export default withRouter(connect(mapStateToProps)(CatalogRoutes));