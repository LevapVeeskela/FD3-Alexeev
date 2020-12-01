import React from 'react'
import RainbowFrame from '../RainbowFrame/RainbowFrame';

const withRainbowFrame = colors => Comp => props =>(
    <RainbowFrame colors={colors}>
      <Comp {...props}>
      </Comp>
    </RainbowFrame>)
;

export { withRainbowFrame };