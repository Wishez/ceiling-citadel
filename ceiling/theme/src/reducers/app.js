import {
  SET_USER_DATA
} from "./../constants/actionTypes.js";

export const initState = {
  ...window.navigator.ARTCEILING_INFO,
  mobileMediaQuery: window.matchMedia("(max-width: 678px)"),
  map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.346384211085!2d37.66873831593188!3d55.78722298056262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b53584d0651261%3A0xba525273abdde888!2z0YPQuy4g0KjRg9C80LrQuNC90LAsIDIw0YExLCDQnNC-0YHQutCy0LAsIDEwNzExMw!5e0!3m2!1sru!2sru!4v1516777576394" width="100%" frameborder="0" style="border:0" allowfullscreen></iframe>'
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: {
          ...action.userData
        }
      };
    default:
      return state;
  }
};

const isMobile = () => state => state.app.mobileMediaQuery.matches;

export {
  reducer as default,
  isMobile,
};
