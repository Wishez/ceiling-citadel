// import lozad from 'lozad';
import {Linear} from 'gsap';

export const getDeleteProductArguments = (index, name, quantityOrderedProducts) => {
	const lastProudctRemovedMessage = `Вы удалили  из корзины последний продукт "${name}" ಥ⌣ಥ.`;
    const removedProductMessage = `Вы удалили из корзины "${name}" ಠ_ಠ!`

    return [
    	index, 
        quantityOrderedProducts - 1 === 0 ? lastProudctRemovedMessage : removedProductMessage,
        quantityOrderedProducts - 1
    ];
};
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

export const localData = {
	get: (key, isJSON=true) => {
		const value = localStorage.getItem(key);

		if (isJSON)
			return JSON.parse(value);

		return value;
	},
	set: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	},
	delete: (key) => {
		localStorage.removeItem(key);	
	}
}

export const convertDate = date => {
	return new Date(date).toLocaleDateString('ru-RU', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	});	
};

export const slideTo = () => {
	$('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 600, Linear.ease);
}

export const notFollow = event => {
	event.preventDefault();
	
	const url = event.target.href;
	  
  	window.open(url);
	  
}

