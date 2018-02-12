
// Footer data
export const siteApi =  'http://localhost:8000'
export const callbackUrl = `${siteApi}/make_form/callback/`;
export const orderUrl = `${siteApi}/make_form/order/`;
export const questionUrl = `${siteApi}/make_form/question/`;

const catalogApi = '/catalog/api/current';

export const productUrl = `${siteApi}${catalogApi}/product/`;
export const collectionUrl = `${siteApi}${catalogApi}/collection/`;
export const categoryUrl = `${siteApi}${catalogApi}/category/`;
export const brandUrl = `${siteApi}${catalogApi}/brand/`;
export const catalogUrl = `${siteApi}${catalogApi}/catalog/`
export const productAlbumUrl = `${siteApi}${catalogApi}/album/`

export const catalogCollectionUrl = `/catalog/collection/`;
export const catalogBrandUrl = `/catalog/brand/`;
export const catalogCategoryUrl = `/catalog/category/`;

// About section constants
import OrderButton from './../components/OrderButton';
import nice_to_meet_you from './../images/about/sharp_first.png';
import products from './../images/about/sharp.png';
import design from './../images/about/square.png';
import exhibition from './../images/about/exhebition1.png';
import boxes from './../images/about/boxes.png';


export const aboutSections = [{
	title: "приятно познакомиться",
	text: "Мы поставщики большого объёма дизайнерских потолков, под кодовым именем ArtCeil.",
	image: "",
	maxWidth: 187,
	modifier: "niceToMeetYou",
	sources: [{url: nice_to_meet_you, media: `(max-width: ${992 / 16}em)`}],
	children: ""
},
{
	title: "Продукция",
	text: "Мы предлагаем бренды с обширным выбором разнообразных дизайнерских качественных потолочных покрытий.",
	image: products,
	maxWidth: 206,
	modifier: "products",
	sources: [],
	children: ""
},
{
	title: "дизайн",
	text: "Все они имеют нестандартную форму и сотканы из различных материалов. Эти потолки заставят расцвести ваше помещение и привлекут внимание со стороны, что хорошо для нас и для вас!",
	image: "",
	sources: [{url: design, media: `(max-width: ${992 / 16}em)`}],
	children: "",
	maxWidth: 190,
	modifier: "design",
},
{
	title: "Локальный Эрмитаж",
	text: `Наша галерея хранит отборные дизайнерские работы. Она делится на несколько залов, которые, вероятно, заинтересуют вас:&nbsp;<a href="/catalog#brands">зал с брэндами</a>&thinsp;и&thinsp;<a href="/catalog#categories">зал с разнообразым типами потолков</a>.`,
	image: exhibition,
	sources: [],
	children: "",
	maxWidth: 215,
	modifier: "exhibition",
},
// {
// 	title: "просторная сумка",
// 	text: `Понравившийся потолок, или декоративную его часть, вы можете добавить в избранное, а после окончания просмотра оформить заказ. `,
// 	image: boxes,
// 	sources: [],
// 	children: "",
// 	maxWidth: 190,
// 	modifier: "design",
// }
];