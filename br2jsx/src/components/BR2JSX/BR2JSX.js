import React, { Fragment } from 'react';

const BR2JSX  = props => (
    <div className='br2jsx'>
        {
            props.text.split(/<br[\s|\/]*>/).map((el,i,array) => <Fragment>
                {el}
                {array.length - 1 === i ? null : <br/>}
            </Fragment>)
        }
    </div>);

export default BR2JSX;