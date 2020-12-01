import React, { Fragment } from 'react';

import DoubleButton from './DoubleButton/DoubleButton';
import { withRainbowFrame } from './HOC/withRainbowFrame';

class Container extends React.Component {

  render() {
    const colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
    const FramedDoubleButton=withRainbowFrame(colors)(DoubleButton);

    return  (
    <Fragment>
      <DoubleButton caption1="однажды" caption2="пору" cbPressed={ num => alert(num) }>в студёную зимнюю</DoubleButton>
      <div style={{marginTop: "20px"}}>
        <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={ num => alert(num) }>вышел, был сильный</FramedDoubleButton>
      </div>
    </Fragment>
    )
  }
};

export default Container; 