export const required = value => value ? undefined : 'Это поле обязательно';

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Неправильный e-mail адрес' : undefined;
export const firstMiddleLastNames = value => value && /^[A-ZА-ЯЁ][a-zа-яё]*$/i.test(value) ? undefined :
	'Вы можете использовать кириллические и латинские буквы, с первой строчной буквой и прописными следующие за ней.';
export const cityRegionStreet = value => value && /^[a-zA-Zа-яА-Я\s\-]*$/i.test(value) ? undefined :
	'В название допустимо использование пробелов, символа "-", кириллические и латинские буквы от a-z, от а-я.';
export const houseNum = value => value && /^[\w0-9]*$/i.test(value) ? undefined :
	'Номер дома может состоять из цифр, вместе с кириллическими или латинскими буквами.';
export const passport = value => value && /^[A-ZА-Я0-9\-]*$/i.test(value) ? undefined :
	'Серия и номер пасспорта может содержать цифры, символ "-" и кириллические или латинские буквы верхнего регистра ー А-Я, A-Z.';
export const birthday = value => value && /^([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/([1-2][019][0-9][0-9])$/i.test(value) ? undefined :
	'Формат даты ー dd/mm/yyyy.';

export const phone = value => value && /^\+?[0-9\s\-)(]*$/i.test(value) ? undefined :
	'Используйте цифры от 0 до 9. Допустимо помещать их в скобки (), использовать пробелы, или ставить между цифрами тире "-".';




const createMessage = (nameOfSmth, min, max) => (
	`Название ${nameOfSmth} должно содержать не меньше ${min} символов и не больше ${max}.`
);
const createLengthMessage = (nameOfSmth, min, max) => (
	`Минимальная длина ${nameOfSmth} — ${min} символа. Максимальная — ${max} символов.`
);

export const cityLength = value => value && !(value.length < 3) ? undefined :
	createMessage('города', 3, 50);
export const regionLength = value => value && !(value.length < 5) ? undefined :
	createMessage('области', 5, 50);
export const streetLength = value => value && !(value.length < 3) ? undefined :
	createMessage('улицы', 3, 50);

export const nameLength = value => value && !(value.length < 2) ? undefined :
	createLengthMessage('имени', 2, 24);
export const lastNameLength = value => value && value.length >= 2 ? undefined :
	createLengthMessage('фамилии', 2, 30);	
export const middleNameLength = value => value && value.length >= 2 ? undefined :
	createLengthMessage('отчества', 2, 30);	
export const houseNumLength = value => value && value.length > 0 ? undefined :
	createLengthMessage('номера дома', 1, 7);
export const passportLength = value => value && value.length > 6 ? undefined :
	createLengthMessage('пасспорта', 7, 15);
export const phoneLength = value => value && value.length > 0 ? undefined :
	createLengthMessage('номера телефон', 11, 24);