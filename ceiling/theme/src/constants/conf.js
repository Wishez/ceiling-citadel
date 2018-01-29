
// For second section
// Two styles - "dark" and "light"
export const activities = [
	{
		title: 'Oriflame',
		style: 'dark',
		text: '<p class="paragraph aboutItem__paragraph">Сегодня Орифлейм ー одна из самых быстрорастущих косметических компаний в мире. ' +
		'Она работает в 60 странах мира, в 30 из которых лидирует на рынке прямых продаж. ' +
		'Орифлейм предлагает широкий спектр высококачественных средств по уходу за кожей, парфюмерии и декоративной косметики.</p>'
	},
	{
		title: 'Продукция',
		style: 'light',
		text: '<p class="paragraph aboutItem__paragraph">Формулы косметических средств сочетают в себе и целительную магию старинных рецептов, созданных известными врачами прошлых тысячелетий, ' +
		'и последние достижения в области косметологии. ' +
		'Один из принципов Орифлейм (Oriflame) при создании новых средств ー это сочетание лучшего в науке с лучшим в природе. ' +
		'Продукция создается при помощи новейших технологий из высококачественных компонентов природного происхождения ー фруктов, цветов и других растений.</p>'
	},
	{
		title: 'Wellness',
		style: 'dark',
		text: '<p class="paragraph aboutItem__paragraph">Серия Wellness от Oriflame производится в соответствии со строжайшими стандартами качества.</p>' +
		'<p class="paragraph aboutItem__paragraph">В научной коллегии Oriflame всемирно признанные специалисты и эксперты с солидным опытом в разных областях исследований.</p>'
	},
	{
		title: 'Команда',
		style: 'light',
		text: '<p class="paragraph aboutItem__paragraph">Регистрируясь на нашем сайте, вы попадаете в нашу команду! Мы поможем вам научиться оформлять заказы, будем консультировать и сопровождать. ' + 
		'А если вы захотите зарабатывать с нами, научим всему необходимому.</p>'
	}
];
// Footer data
export const email = 'balagur08@yandex.ru ';
export const phone = '8 (926) 562-63-01 ';
export const address = 'М.о. Одинцово, ул.Маршала Неделина 2, подъезд 1';
export const addressHref = 'https://yandex.ru/maps/-/CBaIyGXtPB';
export const map = '<iframe src="https://yandex.ru/map-widget/v1/-/CBaIy8W5DA" width="100%" height="600" frameborder="0"></iframe>';
// Sliders 
// Main Slider's images
const staticPath = '/static/business/img/slides/';
export const images = [
	staticPath + 'slide1.jpg',
	staticPath + 'slide2.png',
	staticPath + 'slide3.jpg',
	staticPath + 'slide4.jpg',
	staticPath + 'slide5.jpg'
];
export const mainSliderCustoms = {
  dots: true,
  infinite: true,
  speed: 1000,
  fade: true,
  cssEase: 'linear',
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [{
      breakpoint: 800,
      settings: {
        arrows: false
      }  
    }
  ]
};
export const catalogs = [
	{
		refer: 'http://ru.oriflame.com/ecatalogue/105263?per=201609',
		image: 'http://ru.oriflame.com/catalogue-image.png'
	}
];
export const catalogSliderCustoms = {
	lazyLoad: 'ondemand',
	slidesToShow: 4,
	slidesToScroll: 1,
	arrows: true,
	responsive: [{
		breakpoint: 800,
		settings: {
			slidesToShow: 2,
		}  
	}, {
		breakpoint: 991,
		settings: {
	   		slidesToShow: 3,
		}
	}]
};
