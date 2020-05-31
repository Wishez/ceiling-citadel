import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as localforage from 'localforage'

import { CATALOG } from "./../../constants/catalog";
import getClass from "./../../constants/classes";
import { getArray, slideTo } from "./../../constants/pureFunctions.js";
import { catalogSectionCombiner, catalogSubsectionsCombiner } from "./../../constants/filter";
import { catalogBrandUrl, catalogCategoryUrl } from "./../../constants/conf";

import picture from "./../../images/icons/picture.png";


import CatalogSection from "./../../components/Catalog/CatalogSection";
import Figure from "./../../components/Figure";

class CatalogPageContainer extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    isRequesting: PropTypes.bool.isRequired,
  }
  state = {
    isCatalogGotten: false,
    categories: [],
    brands: [],
  }


  componentDidMount() {
    this.requestCatalogEntities();
  }

  requestCatalogEntities = () => {
    localforage.getItem(
      CATALOG,
      (err, catalog) => {
        this.renderCatalogEntities(catalog);
      });
  }

  renderCatalogEntities = (catalog) => {
    if (catalog !== null) {
      this.setState({
        brands: catalogSectionCombiner(
          getArray(catalog.brands),
          catalogBrandUrl
        ),
        categories: catalogSubsectionsCombiner(
          getArray(catalog.categories),
          catalogCategoryUrl,
          "section"
        ),
        isCatalogGotten: true,
      });
    }
  }

  gogo = (selector) => (event) => {
    event.preventDefault();
    slideTo({
      selector,
    });

    return false;
  }

  render() {
    const { isRequesting } = this.props;
    const {
      isCatalogGotten,
      categories,
      brands,
    } = this.state;

    return (
      <div className={
        getClass({
          b: "container",
          m: "main",
          add: "parent column centered",
        })
      }
      >
        <div className={
          getClass({
            b: "catalogHeader",
            m: "catalog",
            add: "parent row v-centered h-centered",
          })
        }
        >
          <h1 className={
            getClass({
              b: "catalogHeader",
              el: "title",
              m: "catalog",
              add: "parent row centered baseChild textCentered_xxs",
            })
          }
          >
            Выставочный зал
            <Figure name="picture" url={picture} maxWidth={68} />
          </h1>
          <ul className="catalogRefersList parent row h-around baseChild">
            <li className="catalogRefer">
              <a
                href="#brands"
                onClick={this.gogo("#brands")}
                className="catalogRefer__refer"
              >
                Бренды
              </a>
            </li>
            <li className="catalogRefer">
              <a
                href="#categories"
                onClick={this.gogo("#categories")}
                className="catalogRefer__refer"
              >
                Категории
              </a>
            </li>
          </ul>
          <p className="catalogHeader__slogan parent row h-end baseChild darkBlue">
            Цитадель потолочных покрытий
          </p>
        </div>

        <CatalogSection name="Бренды" headerId="brands">
          {
            !isRequesting &&
            brands.length ?
              brands
              : ""
          }
        </CatalogSection>
        <CatalogSection name="Категории" headerId="categories">
          {
            !isRequesting &&
            categories.length ?
              categories
              : ""
          }
        </CatalogSection>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { catalog } = state;

  return {
    ...catalog,
  };
};

export default withRouter(connect(mapStateToProps)(CatalogPageContainer));
