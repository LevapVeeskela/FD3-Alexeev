import React from 'react'
import RainbowFrame from '../RainbowFrame/RainbowFrame';

const withRainbowFrame = colors => Comp => props =>(
    <RainbowFrame colors={colors}>
      <Comp {...props}>
        {props.children}
      </Comp>
    </RainbowFrame>)
;

export { withRainbowFrame };