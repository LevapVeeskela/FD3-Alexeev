import React from 'react';

const RainbowFrame = props => (
    <div style={{border: `5px solid ${props.colors[0]}`, padding: "5px", textAlign: "center"}}>
        {props.colors.length === 1 ? props.children : <RainbowFrame colors={props.colors.slice(1)} children={props.children}/>}
    </div>);

export default RainbowFrame; 