import React from 'React';
import getClass from './../constants/classes';

const Figure = ({
  block,
  url,
  name,
  maxWidth,
  sources,
  className,
  modifier,
  alt
}) => (
  <picture className={getClass({
    b: block,
    add: `imageContainer imageContainer_${name} ${className}`
  })}
  style={{
    maxWidth: maxWidth
  }}
  >
    {sources ?
      sources.map((source, index) =>
        <source key={index} srcSet={source.url} media={source.media}/>
      ) :
      <source srcSet={url} media="screen" />
    }
    <img src={url}
      alt={alt ? alt : ''}
      className={getClass({
        b: block,
        el: 'image',
        add: `imageContainer__image imageContainer__image_${name}`
      })} />
  </picture>
);

export default Figure;
