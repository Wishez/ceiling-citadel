import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import Button from './Button';
import { Field } from 'redux-form';
import RenderController from './RenderController';

const Form = ({
  block, 
  modifier='',
  children,
  handleSubmit,
  onSubmit,
  buttonOptions,
  button,
  className,
  fields=[],
  column=true,
  serverError,
  showButton=true,
  centered=true,
  ...rest
}) => (
  <form className={getClass(composeClasses(block, '', modifier, `${className} parent${column ? ' column' : ''}${centered ? ' centered' : ''}`))}
    onSubmit={handleSubmit(onSubmit.bind(this))}
  >
    {fields.map((field, index) => (
      ('isShown' in field && field.isShown) || !('isShown' in field) ?
        <Field key={index} {...field}
          component={'component' in field ? 
            field.component : 
            RenderController
          } /> : ''
    ))}
    {children}
    {serverError ?  
      <p className={getClass({b: 'serverError'})}>{serverError.toString()}</p> :
      ''
    }
    {button ? 
      button :
      showButton ? 
        <Button type="submit" block="formButton" {...buttonOptions} /> : 
        ''
    }
  </form>
);


export default Form;
