import React from 'react';
import anime from 'animejs';
import {stopAnimation} from './../../constants/pureFunctions';

export default class SlidePreview extends React.Component {
  componentDidUpdate() {
    const {
      offset,
      animElasticity,
      animDuration,
      contentAnimMultiplier
    } = this.props;

    const { xOff, yOff } = offset;
    const { animations, triangle, content } = this;

    if (animations) stopAnimation(animations);
    this.setTopPosition(yOff);
    const contentOff = content.offsetWidth;
    const triangleOff = triangle.offsetWidth;

    const contentAnim = anime({
      targets: content,
      duration: animDuration * contentAnimMultiplier,
      elasticity: animElasticity * contentAnimMultiplier,
      translateX: this.clamp(xOff - contentOff / 2, contentOff)
    });

    const triangleAnim = anime({
      targets: triangle,
      translateX: xOff - triangleOff * 2 ,
      elasticity: animElasticity,
      duration: animDuration
    });

    this.animations = [contentAnim, triangleAnim];
  }

  setTopPosition(yOff) {
    const { gap } = this.props;
    const { content, triangle } = this;
    const triangleOff = triangle.offsetHeight;
    const contentOff = content.offsetHeight;
    const offset = yOff - gap;
    content.style.top = `${offset - contentOff - triangleOff}px`;
    triangle.style.top = `${offset - triangleOff}px`;
  }

  clamp(amount, offset) {
    const min = 0;
    const max = window.innerWidth - offset;
    // http://stackoverflow.com/a/11409978
    return Math.max(min, Math.min(amount, max));
  }

  render() {
    const { children, active } = this.props;
    const baseClass = 'slide__slide-preview';
    const activeClass = 'slide__slide-preview--active';
    const classes = active ? `${baseClass} ${activeClass}` : baseClass;
    return (
      <div className={classes}>
        <div
          className='slide-preview__content'
          ref={el => { this.content = el; }}
          children={children}
        />
        <div
          className='slide-preview__triangle'
          ref={el => { this.triangle = el; }}
        />
      </div>
    );
  }
}
