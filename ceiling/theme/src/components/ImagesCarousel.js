import OwlCarousel from 'react-owl-carousel';
import React from 'react';
import getClass from './../constants/classes';
import Figure from './Figure';
import ReactTooltip from 'react-tooltip';
import NormalizeWheel from './../lib/js/normwheel';

const ImagesCarousel = ({
  images,
  className,
  ...options,
}) => (
  <OwlCarousel {...options} 
    className={getClass({
      b: 'carousel', 
      m: 'product', 
      add: 'owl-carousel'	
    })}

  >
    {images.map((item, index) => (
      <div key={index}>
        <Figure 
          url={item.image}
          name="slide" 
          maxWidth="100%" 
          data-tip
          data-for={`productSlide_${index}`}
        />
        <ReactTooltip id={`productSlide_${index}`}>
          <h3>{item.alt}</h3>
        </ReactTooltip>
      </div>
    ))}
  </OwlCarousel>
);


export default ImagesCarousel;
// dotClass={getClass({b: 'owl-dot'})}
// 		dotsClass={getClass({b: 'owl-dots'})}
// 		navClass={[getClass({b: 'owl-prev'}),getClass({b: 'owl-next'})]}
// 		navContainerClass={getClass({b: 'owl-nav'})}
// 		stageOuterClass={getClass({b: 'owl-stage-outer'})}
// 		stageClass={getClass({b: 'owl-stage'})}
// 		dragClass={getClass({b: 'owl-drag'})}
// 		conrolsClass={getClass({b: 'owl-nav'})}
// 		autoHeightClass={getClass({b: 'owl-height'})}
// 		loadingClass={getClass({b: 'owl-loading'})}
// 		loadedClass={getClass({b: 'owl-loaded'})}
// 		refreshClass={getClass({b: 'owl-refresh'})}
