import React from 'react';

// styles
import './Confirm.css';

// helpers
import {
    SelectConfirmStyle,
    SelectConfirmIcon
} from '../../helpers/ConfirmHelper';

class Confirm extends React.Component {

    actionConfirm = () => {
        this.props.csActionConfirm(this.props.item);
    };
    cancelConfirm = () => {
        this.props.csCancelConfirm();
    };
    render() {
        return <div className={`${SelectConfirmStyle(this.props.type)} confirmBox`} role='alert'>
            <div className='row'>
                <i className={`${SelectConfirmIcon(this.props.type)} col-2`}> </i>
                <h5 className='textConfirm  col-10'>{this.props.text}</h5>
                    <button value={this.props.textButton}
                        type='button'
                        className='col-12 btn btn-outline-success'
                        onClick={this.actionConfirm}>
                    <span>
                        {this.props.textButton}
                    </span>
                </button>
                <button  className= 'close'
                        type='button'
                        data-dismiss='alert'
                        aria-label='Close'
                        onClick= {this.cancelConfirm}>        
                    <span aria-hidden='true'>
                        {'\u00D7'}
                    </span>
                </button>
            </div>
        </div>
    }
}

Confirm.defaultProps = {
    textButton: 'Oк'
}

export default Confirm;
