
const initSharesState = {
	phone: '+7 (985) 905-12-51',
    email: 'shiningfinger@list.ru'
};


const app = (
	state = initSharesState,
	action
) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default app;