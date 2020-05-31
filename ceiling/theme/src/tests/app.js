import {setUserData} from "./../actions/app";
import expect from "expect";
import deepFreeze from "deep-freeze";
import callback, {initState} from "./../reducers/app";

const setUserDataTest = () => {
  const appBefore = initState;

  const full_name = "Filipp Zhuravlev";
  const phone_number = "+7 (985) 905-12-51";
  const email = "shiningfinger@list.ru";

  const appAfter = {
    ...initState,
    userData: {
      full_name,
      phone_number,
      email
    }
  };

  deepFreeze(appBefore);

  expect(
    callback(appBefore, setUserData(full_name, phone_number, email))
  ).toEqual(appAfter);
};


setUserDataTest();

