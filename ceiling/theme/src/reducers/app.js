import {
	SET_USER_DATA
} from './../constants/actionTypes.js'

export const initState = {
	phone: '+7 (985) 905-12-51',
    email: 'shiningfinger@list.ru',
  	address: "Шумкина д. 20 стр.",
  	addressHref: "https://www.google.ru/maps/place/%D1%83%D0%BB.+%D0%A8%D1%83%D0%BC%D0%BA%D0%B8%D0%BD%D0%B0,+20%D1%811,+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,+107113/@55.787223,37.6687383,17z/data=!3m1!4b1!4m5!3m4!1s0x46b53584d0651261:0xba525273abdde888!8m2!3d55.787223!4d37.670927",
  	map: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.346384211085!2d37.66873831593188!3d55.78722298056262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b53584d0651261%3A0xba525273abdde888!2z0YPQuy4g0KjRg9C80LrQuNC90LAsIDIw0YExLCDQnNC-0YHQutCy0LAsIDEwNzExMw!5e0!3m2!1sru!2sru!4v1516777576394" width="100%" frameborder="0" style="border:0" allowfullscreen></iframe>`
};

const app = (
	state = initState,
	action
) => {
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

export default app;