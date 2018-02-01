import * as Cookies from 'js-cookie';

const customAjaxRequest = ({
	url,
	data,
	type,
	crossDomain=false,
	...rest
}) => {
	const headers = new Headers();

	const csrftoken = Cookies.get('csrftoken');
	const csrfSafeMethod = (method) => (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));

	headers.append('Content-Type', 'application/json');

	if (!csrfSafeMethod(type) && !crossDomain) {
 		headers.append("X-CSRFToken", csrftoken);
	}
	
	const options= {
		method: type,
		headers,
		body: JSON.stringify(data),
		...rest
	};

	return new Request(url, options);

};



export default customAjaxRequest;