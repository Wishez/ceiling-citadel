import React from "react";
import anime from "animejs";
import { stopAnimation } from "./../../constants/pureFunctions";

export default class Slide extends React.Component {
  componentWillReceiveProps() {
    const { current } = this.props;
    this.setState({ current });
  }

  componentDidUpdate() {
    if (this.state.current === this.props.current) return;

    const { anim, el } = this;
    if (anim) stopAnimation(anim);

    // using anime's [start, finish] syntax for scale
    // and opacity was causing a weird stutter so we're
    // just manually setting the initial state here.
    el.style.transform = "scale(0.85)";
    el.style.opacity = 0;
    this.anim = anime({
      targets: el,
      scale: 1,
      opacity: 1,
      duration: 250,
      easing: "easeOutQuint",
    });
  }

  render() {
    const { previous, current } = this.props;
    return (
      <div className="slide-wrap">
        <div className="slide">
          <div className="slide__inner">
            {previous}
          </div>
          <div className="slide__inner slide__inner--active" ref={(el) => { this.el = el; }}>
            {current}
          </div>
        </div>
      </div>
    );
  }
}
