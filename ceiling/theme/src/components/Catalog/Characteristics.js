import React  from 'react';
import getClass from './../../constants/classes';

import Characteristic from './Characteristic';

const Characteristics = ({ 
  width,
  height,
  thickness,
  length,
  brand,
  colors,
  modifier,
  className,
  name,
  url,
  children,
  ...rest
}) => (
  <article className={getClass({b: 'characteristics', m: modifier, add: `${className} parent column h-start v-start zeroVerticalMargin` })}>
    <h4 className={getClass({b: 'visible-hidden'})}>{`Характеристики ${name}`}</h4>
    {brand ? <Characteristic name="brand" value={brand} label="Производитель" /> : ''}
    {width ? <Characteristic name="width" value={width} label="Ширина" /> : ''}
    {length ? <Characteristic name="length" value={length} label="Длина" /> : ''}
    {height ? <Characteristic name="height" value={height} label="Высота" /> : ''}
    {thickness ? <Characteristic name="thickness" value={thickness} label="Толщина" /> : ''}
    {(typeof colors === 'object' && colors.length) ? 
      <Characteristic name="colors" label="Цвета">
        <div className={getClass({b: 'colors', add: 'zeroVerticalMargin parent row'})}>
          {colors.map((color, index) => (
            <div key={index} className={getClass({b: 'colorContainer', add: 'parent column zeroVerticalMargin'})}>
              <span style={{backgroundColor: color.color}} className={getClass({b: 'colorContainer', el: 'color', add: 'zeroVerticalMargin'})}></span>
              <span className={getClass({b: 'colorContainer', el: 'name', add: 'visible-hidden'})}>{color.name}</span>
            </div>
          ))}
        </div>
      </Characteristic> : ''}
    {typeof colors === 'string' ? 
      <Characteristic name="colors" label="Цвет" value={colors} /> : ''}
    {children}
    <a href={url} className={getClass({
      b: 'moreRefer',
      m: modifier,
      add: 'parent row centered zeroVerticalMargin'
    })}>Подробнее</a>
  </article>
	
);

export default Characteristics;
