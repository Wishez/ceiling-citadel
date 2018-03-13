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
    combustibility: PropTypes.array,
    proportions: PropTypes.array,
    edges: PropTypes.array,
    colors: PropTypes.array,
    material: PropTypes.array,
    lightning: PropTypes.array,
    width: PropTypes.string,
    height: PropTypes.string,
    thickness: PropTypes.string,
    length: PropTypes.string,
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    step_between_panels: PropTypes.string,
    diameter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    angle_of_bend: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ceil_size:  PropTypes.string,
  }
  // Internal state of select controllers' values.
  state = {
    combustibilityValue: '',
    acousticsValue: '',
    edgesValue: '',
    colorsValue: '',
    materialValue: '',
    lightningValue: '',
    proportionsValue: '',
  }
  
  onChangeSelect = input => (event, index, value) => {
    input.onChange(value) ;

    this.setState({
      [`${input.name}Value`]: value 
    });
      
  }
  submitAddProduct = (values, dispatch) => {
    const {
      uuid, 
      name, 
      image,
      url
    } = this.props;
    
    dispatch(showAddingProductToCart({
      ...values,
      uuid,
      name,
      quantity: 1, 
      image: image,
      url
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
      ceil_size,
      thickness,
      length,
      step_between_panels,
      angle_of_bend,
      diameter,
      proportions,
    } = this.props;

    return (
      <MuiThemeProvider>
        <section className={getClass({b: 'addProductFormSection', add: 'catalogForm'})}>

          <h2 className={getClass({b: 'addProductFormSection', el: 'title', add: 'upper parent row'})}>Характеристики</h2>
          <div className={getClass({b: 'addProductFormContainer', add: `parent column ${isProductAdded ? 'centered' : 'h-end' }`})}>
            <Figure url={image} maxWidth="33.33%" name="product" />
            {!isProductAdded ? 

              <AddProductForm {...this.state}
                buttonOptions={{ 
                  content: !isRequesting ? 'В корзину' : <Loader name="addProductFormLoader" />,
                  modifier: 'product'
                }}
                className="row h-start v-centered"
                centered={false}
                column={false}
                onChangeSelect={this.onChangeSelect}
                combustibility={makeSelectOptions(combustibility)}
                acoustics={makeSelectOptions(acoustics)}
                edges={makeSelectOptions(edges)}
                colors={makeSelectColorOptions(colors)}
                material={makeSelectOptions(material)}
                lightning={makeSelectOptions(lightning)}
                proportions={makeSelectOptions(proportions)}
                width={width}
                height={height}
                thickness={thickness}
                length={length}
                ceil_size={ceil_size}
                step_between_panels={step_between_panels}
                angle_of_bend={angle_of_bend}
                diameter={diameter}
                onSubmit={this.submitAddProduct} 
                helpText={helpText.toString()}
                block="addProductForm"
              /> :
              <p className={getClass({b: 'successfull', m:'addProductForm', add: 'parent row centered'})}>
                {ReactHtmlParser(helpText)}
                <OrderButtonContainer 
                  cartPosition={cartPositions.bag}
                  cartModifier="hover_bottom" 
                  modifier="product"
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

  const { PRODUCT } = catalog;
  return {
    isProductAdded,
    helpText,
    isRequesting,
    uuid: PRODUCT
  };
};

export default withRouter(connect(mapStateToProps)(AddProductFormContainer));
