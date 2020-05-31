import React from "react";
import { reduxForm } from "redux-form";
import getClass, { composeClasses } from "./../constants/classes";
import Form from "./Form";
import phone_number from "./../images/icons/phone.png";
import user from "./../images/icons/user.png";


import {
  required,
  phone,
  fullNameLength,
  full_name,
  phoneLength,
} from "./../constants/validation";

const CallbackForm = ({
  helpText,
  ...rest
}) => (
  <Form
    fields={[
      {
        maxLength: 150,
        minLength: 10,
        name: "full_name",
        type: "text",
        autoComplete: "name",
        validate: [required, fullNameLength, full_name],
        placeholder: "Иванов Иван Иванович",
        label: "ФИО",
        iconOptions: {
          url: user,
          maxWidth: 35,
        },
        className: "parent row h-around",
      },
      {
        type: "tel",
        maxLength: 26,
        autoComplete: "tel",
        minLength: 11,
        name: "phone_number",
        validate: [required, phone, phoneLength],
        placeholder: "+7 (985) 905-02-51",
        label: "Телефон",
        iconOptions: {
          url: phone_number,
          maxWidth: 35,
        },
        className: "parent row h-around",
      },
    ]}
    serverError={helpText}
    {...rest}
  />
);


export default reduxForm({
  form: "callbackForm",
})(CallbackForm);
