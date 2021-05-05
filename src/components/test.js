import React from 'react';
import ItemsCarousel from 'react-items-carousel';
// import range from 'lodash/range';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      activeItemIndex: 0,
    };
  }

  //   createChildren = (n) => range(n).map((i) => <div key={i} style={{ height: 200, background: '#333' }}>{i}</div>);

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;

    return (
      <ItemsCarousel
        // Placeholder configurations
        enablePlaceholder
        numberOfPlaceholderItems={5}
        minimumPlaceholderTime={1000}
        placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        numberOfCards={3}
        gutter={12}
        showSlither
        firstAndLastGutter
        freeScrolling={false}

        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition="center"

        chevronWidth={24}
        rightChevron={'>'}
        leftChevron={'<'}
        outsideChevron={false}
      >
        {children}
      </ItemsCarousel>
    );
  }
}
