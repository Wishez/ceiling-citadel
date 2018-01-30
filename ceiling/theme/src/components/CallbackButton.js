import React from 'react';
import getClass from './../constants/classes';
import Button from './Button';
import colors from './../constants/colors';
import Figure from './Figure';
import callbackIcon from './../images/icons/callback.png';

const CallbackButton = ({
	openCallBackForm,
  ...rest
}) => (
  <div className={getClass({
    b: "callbackButtons",
    add: "parent row h-between v-center"
  })}>
  	<Button
      id='menuButton'
      className={`${getClass({
        b: "callbackButtons",
        el: "button",
      })} ${getClass({
        b: "button",
        m: "cian",
        add: "baseChild"
      })}`}
      onClick={openCallBackForm}
      content="Обратный вызов" 
    />
    <Figure name="callback"
      maxWidth={`${45 / 16}em`}
      width={100}
      height={100}
      url={callbackIcon}
      className="baseChild"
      />
  </div>
    
);


export default CallbackButton;