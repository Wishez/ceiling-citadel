import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlPareser from 'react-html-parser';
import { Card } from 'semantic-ui-react'

import { 
	map,
	address,
	phone,
	email,
	addressHref
 } from './../constants/conf.js';
import { selectNavigationItem } from './../actions/navigationActions.js'; 
import { initNavigationState } from './../reducers/navigation.js';

import Section from './../components/Section';
import Title from './../components/Title';

class ContactsContainer extends Component {
	static PropTypes = {
		dispatch: PropTypes.func.isRequired
	}
	
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(selectNavigationItem(initNavigationState.sixthNavItem.index));
	}

	render() {
		const curEmail = !window.email ? email : window.email,
			curPhone = !window.phone ? phone : window.phone,
			curAddress = !window.address ? address : window.address,
			curAddressHref = !window.addressHref ? addressHref : window.addressHref;
		return (
			<main className='main'>
				<Section block='contacts'>
					<div className='mapContainer'>
						{ReactHtmlPareser(map)}
					</div>
					<Title block='contacts' 
						text='Контакты' />
					<Card.Group className='contactsList'>
						<Card className='contactsListItem'>
							<Card.Content>
								<Card.Header> 
									Адрес
								</Card.Header> 
								<Card.Description> 
									<a className="contactsListItem__ref not-follow" 
										href={curAddressHref} >
										{curAddress}
									</a>
								</Card.Description> 
							</Card.Content>
						</Card>
						<Card className='contactsListItem'>
							<Card.Content>
								<Card.Header> 
									Телефон
								</Card.Header> 
								<Card.Description> 
									<a class="contactsListItem__ref" href={`tel:${curPhone}`}>
										{curPhone}
									</a>
								</Card.Description>
							</Card.Content>
						</Card>
						<Card className='contactsListItem'>
							<Card.Content>
								<Card.Header> 
									E-mail
								</Card.Header> 
								<Card.Description> 
									<a class="contactsListItem__ref" href={`mailto:${curEmail}`}>
										{curEmail}
									</a>
								</Card.Description> 
							</Card.Content>
						</Card>
					</Card.Group>
				</Section>
			</main>
		);
	}
}

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(ContactsContainer));