import React from 'react';
import Slide from './Slide';
import Navigator from './SliderNavigator';
import SlidePreview from './SliderPreview';

export default class Slider extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      previousIndex: 0,
      previewIndex: 0,
      previewActive: false
    };
  }

  handleActive(index) {
    const { activeIndex } = this.state;
    this.setState({
      activeIndex: index,
      previousIndex: activeIndex,
      previewActive: false
    });
  }

  handlePreview(index, offset, activate) {
    this.setState({
      previewOffset: offset,
      previewIndex: index,
      previewActive: activate
    });
  }

  render() {
    const {
      activeIndex,
      previousIndex,
      previewIndex,
      previewOffset,
      previewActive
    } = this.state;

    const { slides, dotSettings, animSettings } = this.props;
    const { preview } = slides[previewIndex];
    const { content: current } = slides[activeIndex];
    const { content: previous } = slides[previousIndex];

    return (
      <div className='slides'>
        <Slide
          current={current}
          previous={previous}
        />
        <SlidePreview
          {...animSettings}
          contentAnimMultiplier={1.65}
          gap={5}
          active={previewActive}
          offset={previewOffset}>
          { preview }
        </SlidePreview>
        <Navigator
          {...dotSettings}
          {...animSettings}
          num={slides.length}
          activeScale={0.75}
          onPreviewChange={this.handlePreview.bind(this)}
          onActiveChange={this.handleActive.bind(this)}
        />
      </div>
    );
  }
}
