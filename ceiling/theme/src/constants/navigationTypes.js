export const SELECT_NAVIGATION_ITEM = 'SELECT_NAVIGATION_ITEM';
export const CLEAN_ACTIVE_STATE = 'CLEAN_ACTIVE_STATE';
export const CLOSE_MENU = 'CLOSE_MENU';
export const OPEN_MENU = 'OPEN_MENU';

import styles from './../index.sass';

function combineItem(firstPart, secondPart, thirdPart=false) {
	firstPart = `<span class="${styles['navItem__refer_darkBlue']}">${firstPart}</span>`;
	secondPart = `<span class="${styles['navItem__refer_orange']}">${secondPart}</span>`;
	thirdPart = thirdPart ? `<span class="${styles['navItem__refer_cian']}">${thirdPart}</span>` : '';

	return `${firstPart}${secondPart}${thirdPart}`;
} 
export const navigationItems = {
	home: combineItem('Глав', 'ная'),
	catalog: combineItem('Ката', 'лог'),
	contacts: combineItem('Кон', 'так', 'ты'),
	service: combineItem('Воз', 'можно', 'сти')
};
