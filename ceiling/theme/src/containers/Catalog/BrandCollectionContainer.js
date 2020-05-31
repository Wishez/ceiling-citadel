import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as localforage from 'localforage'

import { CATALOG, COLLECTION } from "@/constants/catalog";
import { transformName } from "@/constants/pureFunctions";
import { catalogSectionCombiner, findUUID } from "@/constants/filter";


import { fetchCatalogEntityOrGetLocale } from "@/actions/catalog";

import CatalogSection from "@/components/Catalog/CatalogSection";
import BaseCatalogContainer from "./BaseCatalogContainer";

class BrandCollectionContainer extends PureComponent {
    static propTypes = {
      match: PropTypes.object.isRequired,
      COLLECTION: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      isRequesting: PropTypes.bool.isRequired,
    }

    state = {
      id: "",
      brandName: "",
      collection: false,
      slogan: "",
      collectionName: "",
    }

    componentWillMount() {
      this.getIdFromCatalog();
    }

   getIdFromCatalog = (
     callback = false,
     newCollectionSlug,
     newBrandSlug
   ) => {
     const { match } = this.props;
     let { collectionSlug, brandSlug } = match.params;

     if (newCollectionSlug) {
       collectionSlug = newCollectionSlug;
       brandSlug = newBrandSlug;
     }

     localforage.getItem(CATALOG, (error, catalog) => {
       if (catalog !== null && brandSlug in catalog.brands) {
         const brand = catalog.brands[brandSlug];

         const id = findUUID(brand.collections, collectionSlug);

         this.setState({
           brandName: transformName(brand.name),
           id,
         });

         if (callback) {
           callback();
         }
       }
     });
   }

   componentWillUpdate(nextProps) {
     const {
       collectionSlug,
     } = this.props.match.params;

     const { COLLECTION } = this.props;

     if (COLLECTION !== nextProps.COLLECTION) {
       this.setState({
         collection: false,
       });
     }

     const newCollectionSlug = nextProps.match.params.collectionSlug;
     const newBrandSlug = nextProps.match.params.brandSlug;

     if (newCollectionSlug !== collectionSlug) {
       // TODO: I can make destructor, but there is some error with undefined destructor's properties.
       this.getIdFromCatalog(
         this.makeForceRequestCollectionAfterFindingId,
         newCollectionSlug,
         newBrandSlug
       );
     }
   }

   makeForceRequestCollectionAfterFindingId = () => {
     const isForceRequest = true;

     this.requestCollection(isForceRequest);
   }

   requestCollection = (force = false) => {
     const { id, collectionName } = this.state;
     const { dispatch } = this.props;

     if (id) {
       const request = dispatch(
         fetchCatalogEntityOrGetLocale(COLLECTION, id, force)
       );

       if (request) {
         request.then((collection) => {
           this.renderNewCollection({
             previousCollectionName: collectionName,
             collection,
           });
         });
       }
     }
   }

   renderNewCollection = ({
     collection,
     previousCollectionName,
   }) => {
     if (collection) {
       const transformedName = transformName(collection.name);

       if (transformedName !== previousCollectionName) {
         this.setState({
           collectionName: transformedName,
           slogan: collection.slogan,
           collection,
         });
       }
     }
   }

   render() {
     const {
       isRequesting,
     } = this.props;
     const { url } = this.props.match;
     const {
       brandName,
       collection,
       collectionName,
       slogan,
     } = this.state;
     let samplesLength;
     const isSample = true;

     if (!collection) {
       this.requestCollection();
     } else {
       samplesLength = collection && collection.collection_items.length;
     }

     return (
       <BaseCatalogContainer
         name={collectionName}
         slogan={slogan}
         routes={{
           "/catalog": "Каталог",
           "/catalog/brand": false,
           "/catalog/brand/:brandSlug": brandName,
           "/catalog/brand/:brandSlug/:collectionSlug": false,
           "/catalog/brand/:brandSlug/:collectionSlug/": false,
         }}
         CONSTANT={COLLECTION}
       >
         <CatalogSection
           name="Образцы"
           headerId="samples"
           fallback={
             !isRequesting &&
               !samplesLength ? <p className="paragraph_container">У этой коллекции нет образцов.</p> : ""
           }
         >
           {!isRequesting &&
            samplesLength ?
             catalogSectionCombiner(collection.collection_items, url, isSample) :
             ""}
         </CatalogSection>
       </BaseCatalogContainer>
     );
   }
}

const mapStateToProps = (state) => {
  const { catalog } = state;
  const {
    isRequesting,
  } = catalog;

  return {
    COLLECTION: catalog.COLLECTION,
    isRequesting,
  };
};

export default withRouter(connect(mapStateToProps)(BrandCollectionContainer));
