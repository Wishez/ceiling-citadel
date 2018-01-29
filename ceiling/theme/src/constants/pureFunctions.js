export const cookiesHandler = {
	setUsernameAndPasswordToCookies: ({
		site,
		username,
		password
	}) => {
		localStorage.setItem(`${site}Password`, password);
		localStorage.setItem(`${site}Username`, username);
	},
	getUsernameAndPasswordFromCookies: site => (
		{
			username: localStorage.getItem(`${site}Username`),
			password: localStorage.getItem(`${site}Password`)
		}
	),
	clearCookies: site => {
		localStorage.removeItem(`${site}Username`);
		localStorage.removeItem(`${site}Password`);
	}

};

export const convertDate = date => {
	return new Date(date).toLocaleDateString('ru-RU', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	});	
};

