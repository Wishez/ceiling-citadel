import React from "react";
import getClass from "./../constants/classes";
import Button from "./Button";
import colors from "./../constants/colors";
import Figure from "./Figure";
import callbackIcon from "./../images/icons/callback.png";

const CallbackButton = ({
  openCallback,
  isCallbackOpened,
  closeCallback,
  modifier,
  ...rest
}) => (
  <div className={getClass({
    b: "callbackButtons",
    m: modifier,
    add: "parent parent_nowrap row h-between v-centered",
  })}
  >
    <Button
      id="menuButton"
      className={getClass({
        b: "callbackButtons",
        el: "button",
        m: modifier,
        add: "button_cian baseChild",
      })}
      onClick={isCallbackOpened ? closeCallback : openCallback}
      content="Обратный вызов"
      label="Открывает форму отбратного вызова"
    />
    <button
      aria-pressed={false}
      className={getClass({
        b: "callbackFigureButton",
        m: modifier,
        add: "parent row h-between v-centered",
      })}
      aria-label={!isCallbackOpened ? "Открывает форму обратного вызова" : "Закрывает форму обратного вызова"}
      onClick={isCallbackOpened ? closeCallback : openCallback}
      title="Открывает форму для заказа консультации"
    >
      <Figure
        name="callback"
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
