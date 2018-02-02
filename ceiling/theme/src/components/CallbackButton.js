import React from 'react';
import getClass from './../constants/classes';
import Button from './Button';
import colors from './../constants/colors';
import Figure from './Figure';
import callbackIcon from './../images/icons/callback.png';

const CallbackButton = ({
	openCallback,
  isCallbackOpened,
  closeCallback,
  ...rest
}) => (
  <div className={getClass({
    b: "callbackButtons",
    add: "parent row h-between v-centered"
  })}>
  	<Button
      id='menuButton'
      className={getClass({
        b: "callbackButton",
        add: "button_cian baseChild"
      })}
      onClick={isCallbackOpened ? closeCallback :openCallback}
      content="Обратный вызов" 
    />
    <button aria-pressed={false}
      className={getClass({
        b: "callbackFigureButton",
        add: "parent row h-between v-centered"
      })}
      onClick={isCallbackOpened ? closeCallback : openCallback} 
      title="Открывает форму для заказа консультации">
      <Figure name="callback"
        maxWidth={`${45 / 16}em`}
        width={100}
        height={100}
        url={callbackIcon}
        className="baseChild"
      />
    </button>
  </div>
    
);


export default CallbackButton;