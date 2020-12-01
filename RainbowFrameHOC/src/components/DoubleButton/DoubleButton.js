import React from 'react';
import PropTypes from 'prop-types';

class DoubleButton extends React.Component{
    pressed = (EO) => {
        this.props.cbPressed(EO.target.value);
    }

    render(){   
        return (
        <div>
            <input type="button" defaultValue={this.props.caption1} onClick={this.pressed}/>
                <span style={{margin: "0 5px 0 5px"}}>{this.props.children}</span>
            <input type="button" defaultValue={this.props.caption2} onClick={this.pressed}/>  
        </div>)
    }
}

DoubleButton.propType= {
    caption1 : PropTypes.string,
    caption2 : PropTypes.string,
    cbPressed: PropTypes.func
}

export default DoubleButton;
