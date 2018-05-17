import React from 'react';
import getClass from './../../constants/classes';
import {reduxForm} from 'redux-form';
import Form from './../Form';


import combustibilityIcon from './../../images/icons/fire.png';
import acousticsIcon from './../../images/icons/sound.png';
import lightningIcon from './../../images/icons/lightning.png';
import edgesIcon from './../../images/icons/rope.png';
import colorsIcon from './../../images/icons/palette.png';
import materialIcon from './../../images/icons/material.png';
import widthIcon from './../../images/icons/width.png';
import heightIcon from './../../images/icons/height.png';
import thicknessIcon from './../../images/icons/thickness.png';
import lengthIcon from './../../images/icons/length.png';
import starIcon from './../../images/icons/star.png';

import Button from './../Button';
import Figure from './../Figure';
import SelectController from './../Controllers/SelectController';
import {
  required,
  number,
  selectRequired
} from './../../constants/validation';
import RenderController from './../RenderController';
import { Field } from 'redux-form';

const AddProductForm = ({
  helpText,
  combustibility,
  acoustics,
  edges,
  colors,
  material,
  lightning,
  width,
  height,
  thickness,
  step_between_panels,
  angle_of_bend,
  diameter,
  length,
  ceil_size,
  combustibilityValue,
  acousticsValue,
  edgesValue,
  colorsValue,
  materialValue,
  lightningValue,
  proportions,
  onChangeSelect,
  proportionsValue,
  ...rest
}) => (
  <Form
    button={
      <Button type="submit"
        block="formButton"
        {...rest.buttonOptions}
        className="parent row h-around v-centered">
        <Figure url={starIcon}
          maxWidth={25}
          name="addToCart"
        />
      </Button>
    }
    serverError={helpText}
    {...rest}>
    <div className='proportionFields parent column centered parent_nowrap'>
      {[{
        type: 'text',
        maxLength: 10,
        minLength: 1,
        name: 'width',
        modifier: 'small',
        validate: [required, number],
        placeholder: '20мм',
        label: 'Ширина',
        iconOptions: {
          url: widthIcon,
          maxWidth: 35,
          name: 'width'
        },
        showBorder: false,
        className:'parent row h-around',
        asideText: width,
        isShown: width
      },
      {
        type: 'text',
        maxLength: 10,
        minLength: 1,
        name: 'height',
        modifier: 'small',
        validate: [required, number],
        placeholder: '7.99мм',
        label: 'Высота',
        iconOptions: {
          url: heightIcon,
          maxWidth: 35,
          name: 'height'
        },
        showBorder: false,
        className:'parent row h-around',
        asideText: height,
        isShown: height
      },
      {
        type: 'text',
        maxLength: 10,
        minLength: 1,
        name: 'diameter',
        modifier: 'small',
        validate: [required, number],
        placeholder: '55мм',
        showBorder: false,
        label: 'Диаметр окружности',
        // iconOptions: {
        //   url: heightIcon,
        //   maxWidth: 35,
        //   name: 'diameter'
        // },
        className:'parent row h-around',
        asideText: diameter,
        isShown: diameter
      },
      {
        type: 'text',
        maxLength: 10,
        showBorder: false,
        minLength: 1,
        name: 'thickness',
        modifier: 'small',
        validate: [required, number],
        placeholder: '1.49мм',
        label: 'Толщина',
        showBorder: false,
        iconOptions: {
          url: thicknessIcon,
          maxWidth: 35,
          name: 'thickness'
        },
        className:'parent row h-around',
        asideText: thickness,
        isShown: thickness
      },
      {
        type: 'text',
        maxLength: 10,
        minLength: 1,
        name: 'angle_of_bend',
        modifier: 'small',
        showBorder: false,
        validate: [required, number],
        placeholder: '500мм',
        label: 'Мин. угол загиба',
        // iconOptions: {
        //   url: heightIcon,
        //   maxWidth: 35,
        //   name: 'angle_of_bend'
        // },
        className:'parent row h-around',
        asideText: angle_of_bend,
        isShown: angle_of_bend
      },
      {
        type: 'text',
        maxLength: 10,
        minLength: 1,
        showBorder: false,
        name: 'ceil_size',
        modifier: 'small',
        validate: [required, number],
        placeholder: '500мм',
        label: 'Размер ячеек',
        // iconOptions: {
        // url: heightIcon,
        // maxWidth: 35,
        // name: 'ceil_size'
        // },
        className:'parent row h-around',
        asideText: ceil_size,
        isShown: ceil_size
      },
      {
        type: 'text',
        maxLength: 10,
        minLength: 1,
        name: 'length',
        validate: [required, number],
        placeholder: '5м',
        label: 'Длина',
        modifier: 'small',
        showBorder: false,
        iconOptions: {
          url: lengthIcon,
          maxWidth: 35,
          name: 'length'
        },
        className:'parent row h-around',
        asideText: length ,
        isShown: length
      },
      {
        type: 'text',
        maxLength: 10,
        minLength: 1,
        name: 'step_between_panels',
        modifier: 'small',
        showBorder: false,
        validate: [required, number],
        placeholder: '500мм',
        label: 'Шаг между панелями',
        // iconOptions: {
        //   url: heightIcon,
        //   maxWidth: 35,
        //   name: 'step_between_panels'
        // },
        className:'parent row h-around',
        asideText: step_between_panels,
        isShown: step_between_panels
      },
      ].map((field, index) => (
        ('isShown' in field && field.isShown)?
          <Field key={index} {...field}
            component={RenderController} /> : ''
      ))}
    </div>
    <div className='selectFields parent parent_nowrap column centered'>
      {[{
        name: 'combustibility',
        placeholder: 'Горючесть',
        label: 'Горючесть',
        modifier: 'whiteBg',
        iconOptions: {
          url: combustibilityIcon,
          maxWidth: 35,
          name: 'combustibility'
        },
        options: combustibility,
        className:'parent row h-around',

        isShown: combustibility.length,
        value: combustibilityValue,
        hintText: 'Огнеупорная',
        onChangeSelect,
        validate: [selectRequired],
      },
      {
        name: 'proportions',
        placeholder: '600x600x20',
        label: 'Пропорции',
        modifier: 'whiteBg',
        // iconOptions: {
        //   url: combustibilityIcon,
        //   maxWidth: 35,
        //   name: 'combustibility'
        // },
        options: proportions,
        className:'parent row h-around',

        isShown: proportions.length,
        value: proportionsValue,
        hintText: '600x600x20',
        onChangeSelect,
        validate: [selectRequired],
      },
      {
        name: 'lightning',
        placeholder: 'Освящение',
        label: 'Освящение',
        modifier: 'whiteBg',
        hintText: 'Освященное',
        iconOptions: {
          url: lightningIcon,
          maxWidth: 35,
          name: 'lightning'
        },
        options: lightning,
        className:'parent row h-around',

        isShown: lightning.length,
        value: lightningValue,
        onChangeSelect,
        validate: [selectRequired],

      },
      {
        name: 'acoustics',
        placeholder: 'Акустика',
        label: 'Акустика',
        modifier: 'whiteBg',
        iconOptions: {
          url: acousticsIcon,
          maxWidth: 35,
          name: 'acoustics'
        },
        options: acoustics,
        className:'parent row h-around',

        isShown: acoustics.length,
        value: acousticsValue,
        onChangeSelect,
        hintText: 'Шумополглащающая',
        validate: [selectRequired],
      },
      {
        name: 'edges',
        placeholder: 'Кромки',
        label: 'Кромки',
        modifier: 'whiteBg',
        iconOptions: {
          url: edgesIcon,
          maxWidth: 35,
          name: 'edges'
        },
        options: edges,
        className:'parent row h-around',

        isShown: edges.length,
        value: edgesValue,
        hintText: 'Криволинейные',
        onChangeSelect,
        validate: [selectRequired],
      },
      {
        name: 'material',
        placeholder: 'Материал',
        label: 'Материал',
        modifier: 'whiteBg',
        iconOptions: {
          url: materialIcon,
          maxWidth: 35,
          name: 'material'
        },
        options: material,
        className:'parent row h-around',

        isShown: material.length,
        value: materialValue,
        onChangeSelect,
        hintText: 'Алюминий',
        validate: [selectRequired],
      },
      {
        name: 'colors',
        placeholder: 'Цвета',
        label: 'Цвета',
        modifier: 'whiteBg',
        iconOptions: {
          url: colorsIcon,
          maxWidth: 35,
          name: 'colors'
        },
        options: colors,
        className:'parent row h-around',

        isShown: colors.length,
        value: colorsValue,
        onChangeSelect,
        hintText: 'Серебряный',
        validate: [selectRequired],
      }].map((field, index) => (
        ('isShown' in field && field.isShown)?
          <Field key={index} {...field}
            component={SelectController} /> : ''
      ))}
    </div>
  </Form>
);


export default reduxForm({
  form: 'addProductForm'
})(AddProductForm);
