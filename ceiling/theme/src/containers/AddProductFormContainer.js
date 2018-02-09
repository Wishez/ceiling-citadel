import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import getClass from './../constants/classes';
import AddProductForm from './../components/Product/AddProductForm';
import Figure from './../components/Figure';

import OrderButtonContainer from './OrderButtonContainer';
import { cartPositions } from './../constants/cart';
import { showAddingProductToCart } from './../actions/cart';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Loader from './../components/Loader';
import ReactHtmlParser from 'react-html-parser';
import {makeSelectOptions, makeSelectColorOptions} from './../constants/filter';

class AddProductFormContainer extends Component {
  static propTypes = { 
      dispatch: PropTypes.func.isRequired,
      helpText: PropTypes.string.isRequired,
      isProductAdded: PropTypes.bool.isRequired,
      isRequesting: PropTypes.bool.isRequired,
      image: PropTypes.string.isRequired,
      combustibility: PropTypes.array.isRequired,
      edges: PropTypes.array.isRequired,
      colors: PropTypes.array.isRequired,
      material: PropTypes.array.isRequired,
      lightning: PropTypes.array.isRequired,
      width: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      thickness: PropTypes.string.isRequired,
      length: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
  }
  state = {
    combustibilityValue: '',
    acousticsValue: '',
    edgesValue: '',
    colorsValue: '',
    materialValue: '',
    lightningValue: '',
  }
  
  onChangeSelect = input => (event, index, value) => {

      input.onChange(value) ;
      console.log('change', index, value, input, `${input.name}Value`)
      this.setState({
        [`${input.name}Value`]: value 
      });
      
  }
  submitAddProduct = (values, dispatch) => {
    const {uuid} = this.props;
    console.log(values, uuid);
    dispatch(showAddingProductToCart({
      ...values,
      uuid
    }));
  }

  render() {
    
    const { 
      helpText, 
      isProductAdded, 
      isRequesting,
      image,
      combustibility,
      acoustics,
      edges,
      colors,
      material,
      lightning,
      width,
      height,
      thickness,
      length
    } = this.props;
    
   console.log('state', this.state)

    return (
      <MuiThemeProvider>
        <section className={getClass({b: 'addProductFormSection', add: "catalogForm"})}>

          <h2 className={getClass({b: 'addProductFormSection', el: "title", add: "upper parent row"})}>Характеристики</h2>
          <div className={getClass({b: 'addProductFormContainer',  add: "parent column h-end"})}>
            <Figure url={image} maxWidth="33.33%" name="product" />
            {!isProductAdded ? 

              <AddProductForm {...this.state}
                buttonOptions={{ 
                  content: !isRequesting ? "В корзину" : <Loader />,
                  modifier: 'product'
                }}
                onChangeSelect={this.onChangeSelect}
                combustibility={makeSelectOptions(combustibility)}
                acoustics={makeSelectOptions(acoustics)}
                edges={makeSelectOptions(edges)}
                colors={makeSelectColorOptions(colors)}
                material={makeSelectOptions(material)}
                lightning={makeSelectOptions(lightning)}
                width={width}
                height={height}
                thickness={thickness}
                length={length}
                onSubmit={this.submitAddProduct} 
                helpText={helpText.toString()}
                block="addProductForm"
              /> :
              <p className={getClass({b: "successfull", add: "parent row centered"})}>
                {ReactHtmlParser(helpText)}
                <OrderButtonContainer 
                    cartPosition={cartPositions.bag}
                    cartModifier="hover_bottom" 
                />
              </p>
            }
          </div>
        </section>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = state => {
  const { cart, catalog } = state;
  const { 
    isProductAdded,
    isRequesting,
    helpText
  } = cart;

  const { PRODUCT } = catalog
  return {
    isProductAdded,
    helpText,
    isRequesting,
    uuid: PRODUCT
  };
};

export default withRouter(connect(mapStateToProps)(AddProductFormContainer));