import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlPareser from 'react-html-parser';

import Figure from './../components/Figure';


import getClass from './../constants/classes';
import service from './../images/icons/service.png';

import { selectNavigationItem } from './../actions/navigationActions.js'; 
import { initNavigationState } from './../reducers/navigation.js';

import Paragraph from './../components/Paragraph';

class ContactsContainer extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired
	}
	
	componentDidMount() {
		const { dispatch } = this.props;
		document.title = 'Сервис | ArtCeil';
		dispatch(selectNavigationItem(initNavigationState.thirdNavItem.index));
	}

	render() {
		
		return (
			<section className={getClass({b: 'container', m: "main", add: "parent column centered serviceSection"})}>
				<h1 className={getClass({b: 'serviceSection', el: "title", add: "parent row centered"})}>
					Сервис
					<Figure name="service" url={service} maxWidth={71} />
				</h1>
				
				
				<article className={getClass({b: 'deploy'})}>
					<h2 className={getClass({b: 'deploy', el: "title"})}>Монтаж</h2>
					<Paragraph block="deploy" text={`У нас есть профессиональная команда, устанавливающая потолки в разнообразных и необычных местах.`} />
					<Paragraph block="deploy" text={`Каждый член команды — квалифицированный специалист, всегда готовый прийти  к вам  на помощь и разобраться с не установленным потолком, или его недостающими  частями!`} />
				</article>
			</section>
		);
	}
}

const mapStateToProps = state => {

	return {
		
	};
};

export default withRouter(connect(mapStateToProps)(ContactsContainer));