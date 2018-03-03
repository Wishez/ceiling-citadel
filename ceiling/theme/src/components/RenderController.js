import React from 'react';
import getClass from './../constants/classes';
import Figure from './Figure';
import Paragraph from './Paragraph';

const RenderController = ({
  input,
  meta: {
    touched,
    error,
    warning
  },
  block='controller',
  label,
  modifier='',
  style,
  iconOptions,
  className,
  asideText=false,
  isShown,
  ...rest
}) => (
  <div style={style ? style : {}} 
    className={getClass({
      b: block,
      m: modifier,
      add: className
    })}>
    {label ? 
      <label className={getClass({
        b: block,
        el: 'label',
        m: modifier,
        add: 'baseChild'
      })}>
        {label}
      </label> : ''}
    {iconOptions ? 
      <Figure 
        block="controllerIcon" 
        className="baseChild"
        {...iconOptions} 
      /> : ''
    }
    <div className="st-form__input--wrapper  half">
      {(touched && asideText) && 
  			 	((error && 
  			 		<span className={getClass({
  			 		  b: block,
  			 		  el: 'error'
  			 		})}>{error}</span>) || 
  			 		(warning && <span className={getClass({
  			 		  b: block,
  			 		  el: 'error'
  			 		})}>{warning}</span>))}
      {rest.type !== 'textarea' ?
        <input {...input}
          {...rest}
          className={getClass({
            b: block,
            el: 'input',
            m: modifier,
            add: 'baseChild'
          })} 
        /> :
        <textarea {...input}
          {...rest}
          className={getClass({
            b: block,
            el: 'input',
            m: modifier,
            add: 'baseChild'
          })} 
        />
      }
      <span className="input-border"></span>
      <span className="input-border"></span>
    </div>
		 {asideText ? 
		 	<Paragraph block="controller" text={`: ${asideText}`}/> : 
		 	''}
		 {(touched && !asideText) && 
		 	((error && 
		 		<span className={getClass({
		 		  b: block,
		 		  el: 'error'
		 		})}>{error}</span>) || 
		 		(warning && <span className={getClass({
		 		  b: block,
		 		  el: 'error'
		 		})}>{warning}</span>))}

  </div>
);

export default RenderController;
