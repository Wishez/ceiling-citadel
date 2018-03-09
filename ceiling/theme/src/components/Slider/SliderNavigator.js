import React from 'react';
import anime from 'animejs';
import NavDot from './NavDot';
import {stopAnimation} from './../../constants/pureFunctions';

export default class Navigator extends React.Component {
  constructor() {
    super();
    this.state = {
      start: 0,
      snapped: 0,
      index: 0,
      listeners: this.buildListeners()
    };
  }

  buildListeners() {
    return ({
      mousemove: e => {
        e.preventDefault();
        this.drag(e);
      },
      touchmove: e => {
        e.preventDefault();
        e = e.touches[0];
        this.drag(e);
      },
      mouseup: () => {
        this.stopDrag();
      },
      touchend: () => {
        this.stopDrag();
      }
    });
  }

  componentDidMount() {
    const { size, gap, num } = this.props;
    const snaps = [];

    for (let i = 0; i < num; i++) {
      snaps.push(i * (size + gap));
    }

    this.setState({ snaps });
    this.handlePreviewIndex(snaps, snaps[0], false);
  }

  addDragListeners() {
    const { listeners } = this.state;
    for (const listener in listeners) {
      window.addEventListener(listener, listeners[listener]);
    }
  }

  removeDragListeners() {
    const { listeners } = this.state;
    for (const listener in listeners) {
      window.removeEventListener(listener, listeners[listener]);
    }
  }

  startDrag(e) {
    const { activeScale } = this.props;
    const { snapped, snaps } = this.state;
    this.handlePreviewIndex(snaps, snapped);
    this.setState({ start: e.pageX - snapped });
    this.animate(snapped, activeScale);
    this.addDragListeners();
  }

  drag(e) {
    const { activeScale } = this.props;
    const { start, snaps } = this.state;
    const actual = e.pageX - start;
    const snapped = this.snap(snaps, actual);

    if (snapped !== this.state.snapped) {
      this.animate(snapped, activeScale);
      this.handlePreviewIndex(snaps, snapped);
      this.setState({ snapped });
    }
  }

  stopDrag() {
    const { snapped, snaps } = this.state;
    this.handleActiveIndex(snaps, snapped);
    this.animate(snapped, 1);
    this.removeDragListeners();
  }

  handlePreviewIndex(snaps, snapped, activate = true) {
    const { onPreviewChange, size, gap } = this.props;
    const { navEl } = this;
    if (onPreviewChange) {
      const index = snaps.indexOf(snapped);
      const { top, left } = navEl.getBoundingClientRect();
      const dotOffset = (size /2) + gap;
      const offsets = {
        xOff: snapped + left + dotOffset,
        yOff: top + window.pageYOffset
      };
      onPreviewChange(index, offsets, activate);
    }
  }

  handleActiveIndex(snaps, snapped) {
    const index = snaps.indexOf(snapped);
    const { onActiveChange } = this.props;
    if (onActiveChange) {
      onActiveChange(index);
    }
  }

  animate(translateX, scale) {
    const { animElasticity, animDuration } = this.props;
    const { anim } = this;
    if (anim) stopAnimation(anim);
    this.anim = anime({
      targets: this.current.el,
      translateX,
      scale,
      elasticity: animElasticity,
      duration: animDuration
    });
  }

  snap(arr, num) {
    arr = [...arr]; // copy to avoid mutating params
    const diffOne = Math.abs(arr[0] - num);
    const diffTwo = Math.abs(arr[1] - num);
    return diffOne < diffTwo || arr.length === 1
      ? arr[0]
      : this.snap(arr.slice(1), num);
  }

  render() {
    let { num, size, gap } = this.props;
    const dots = [];

    dots.push(
      <NavDot key="first"
        className='slide-nav__current'
        ref={current => { this.current = current; }}
        size={size}
      />
    );

    for (let i = 0; i < num; i++) {
      const margin = (i !== num - 1) ? gap : 0;
      dots.push(
        <NavDot
          key={i}
          className='slide-nav__indicator'
          size={size}
          margin={margin}
        />
      );
    }

    return (
      <div className='slide-nav-wrap'>
        <div
          className='slide-nav'
          ref={el => { this.navEl = el; }}
          onMouseDown={this.startDrag.bind(this)}
          onTouchStart={e => {
            e.preventDefault();
            this.startDrag(e.touches[0]);
          }}>
          {dots}
        </div>
      </div>
    );
  }
}
