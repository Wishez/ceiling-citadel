import React  from 'react';
import getClass from './../../constants/classes';
import Table from './Table';
import Figure from './../Figure';
import Description from './Description';
import Characteristics from './Characteristics';

import {siteApi} from './../../constants/conf';
import {slideTo, timeout} from './../../constants/pureFunctions';
// import ReactLazyBlur from 'react-lazy-blur';
// <Circle>
// <Figure name="sample" url={siteApi + image} maxWidth={190} />
const CatalogItem = ({ 
  block,
  children,
  modifier,
  className,
  content,
  name,
  tablePosition='stretch',
  image,
  description,
  style,
  slug,
  url,
  isSample,
  item,
  ...rest
}) => (
  <article style={{backgroundImage: isSample ? '' : `url("${image}")` }} 
    className={getClass({b: 'catalogItem', m: modifier, add: `${className}${style ? ` catalogItem_${style}`: ''} parent zeroVerticalMargin row h-start v-end` })}>
    {isSample ? 
      <Figure name="sample" url={siteApi + image} maxWidth={190} /> : ''}
    <Table url={url} 
      slug={slug} 
      content={name} 
      modifier={tablePosition} 
      isNotRoute={isSample}
      onClick={() => {
        timeout(() => {
          slideTo({
            selector: '#main'
          });
        }, 500);
      }}
    />
    {isSample ? 
		  <Characteristics url={`${url}${slug}/`} {...item} /> :
		  <Description url={`${url}${slug}/`} content={description} />}
  </article>
);
  // </Circle>

export default CatalogItem;
