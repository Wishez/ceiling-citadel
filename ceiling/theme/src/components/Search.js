import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import { Field, reduxForm } from 'redux-form';
import Button from './Button';
import RenderController from './RenderController';
import colors from './../constants/colors';

const Search = ({
  element='',
  modifier='',
  href,
  content,
  children,
  handleSubmit,
  submitSearch,
  onChange,
  searchName,
  ...rest
}) => (
  <form className={getClass(composeClasses('searchForm', '', modifier,'baseChild parent row h-between v-centered'))}
    onSubmit={handleSubmit(submitSearch.bind(this))}
  >
    <Field name={searchName}
      type="text"
      max-lenght="150"
      placeholder="Поиск"
      component={RenderController}
      className="baseChild"
      modifier="search"
      onChange={onChange}
      autoComplete="off"
    />
    <svg className={getClass({
      b: 'searchButton',
      add: 'baseChild parent row centered'
    })} width="45" height="45" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"> 
      <circle cx="75" cy="75" r="75" fill={colors.darkGray}></circle>
      <circle cx="75" cy="75" r="55" fill="#C98C4D"></circle>
      <path d="M95 135 135 120 L180 180 150 200" ></path>
    </svg>
  </form>
);


export default reduxForm({
  form: 'SearchForm'
})(Search);
