import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    DetailsTypes
} from '../../constants/enums';
import { TextModeInfo } from '../../helpers/DetailsClientHelper';

import { dataEvents } from '../events';

import './DetailsClient.css';

class DetailsClient extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            ...props
        }
    }

    inputIdRef = null;
    inputSurnameRef = null;
    inputNameRef = null;
    inputPatronymicRef = null;
    inputBalanceRef = null;
    
    setNewIdRef = (ref) => {
        this.inputIdRef = ref;
    };
    setNewSurnameRef = (ref) => {
        this.inputSurnameRef = ref;
    };
    setNewNameRef = (ref) => {
        this.inputNameRef = ref;
    };
    setNewPatronymicRef = (ref) => {
        this.inputPatronymicRef = ref;
    };
    setNewBalanceRef = (ref) => {
        this.inputBalanceRef = ref;
    };

    componentDidMount = () => {
        dataEvents.addListener('EChangeSelectClient', this.changeSelectRow);
        dataEvents.addListener('EEditClient', this.editClient);
    };

    componentWillUnmount = () => {
        dataEvents.removeListener('EChangeSelectClient', this.changeSelectRow);
        dataEvents.removeListener('EEditClient', this.editClient);
    };

    changeSelectRow = (data) => {
        if(this.props.client.id !== data.id){
            this.changeInnerValues(data);
        }
    } 
    
    editClient = (data) => {
        if(this.props.client.id !== data.id){
            this.changeInnerValues(data);
        }
    }

    cancel = () => {
        dataEvents.emit('ECancelClient');
    }

    add = () => {
        dataEvents.emit('EAddClient', this.getClientFromRefs());
    }  

    save = () => {
        const newClient = this.getClientFromRefs();
        if (JSON.stringify(this.props.client) !== JSON.stringify(newClient))
            dataEvents.emit('ESaveClient', newClient);
    }

    getClientFromRefs = () => ({
        id: (this.inputIdRef && this.inputIdRef.value) || this.state.client.id,
        surname: this.inputSurnameRef.value,
        name: this.inputNameRef.value,
        patronymic: this.inputPatronymicRef.value,
        balance: Number(this.inputBalanceRef.value),
        isShow: this.props.client.isShow
    });

    changeInnerValues = (store) => {
        if(this.inputIdRef)
            this.inputIdRef.value = store.id;
        this.inputSurnameRef.value = store.surname;
        this.inputNameRef.value = store.name;
        this.inputPatronymicRef.value = store.patronymic;
        this.inputBalanceRef.value = store.balance;
    }

    render(){
        console.log('DetailsClient');

        const buttons = (this.props.mode === DetailsTypes.Create || this.props.mode === DetailsTypes.Edit ? 
            <div className='button-details'>
                <div className='row'>
                    {   this.props.mode === DetailsTypes.Create ?
                        <button type="button" onClick={this.add} className="btn btn-success">Add</button> :
                        <button type="button" onClick={this.save} className="btn btn-success">Save</button>
                    }
                    <button type="button" onClick={this.cancel} style={{marginLeft: "10px"}} className="btn btn-danger">Отмена</button>
                </div>
            </div> 
            : null
        );

        return (
            <div className='col-10 form-control' style={{marginTop: "20px"}}>
                <h5>
                    {TextModeInfo(this.props.mode, this.props.client)}
                </h5>
                { this.props.mode === DetailsTypes.Info &&
                    (<div className='input-group mb-3'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text' id='basic-addon1'>Id</span>
                        </div>
                        <input type='text' defaultValue={this.state.client.id} className='form-control' readOnly aria-describedby='basic-addon1' ref={this.setNewIdRef}/>
                    </div>) 
                }  
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon2'>Surname</span>
                    </div>
                    <input type='text' defaultValue={this.state.client.surname}  ref={this.setNewSurnameRef} name="surname" readOnly={this.props.mode === DetailsTypes.Info} className='form-control' placeholder='Enter name client...' aria-label='Name client' aria-describedby='basic-addon2' aria-describedby='basic-addon2' required/>
                </div>      
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon2'>Name</span>
                    </div>
                    <input type='text' defaultValue={this.state.client.name} ref={this.setNewNameRef} name="name" readOnly={this.props.mode === DetailsTypes.Info} className='form-control' placeholder='Enter name client...' aria-label='Name client' aria-describedby='basic-addon2' aria-describedby='basic-addon2' required/>
                </div>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon2'>Patronymic</span>
                    </div>
                    <input type='text' defaultValue={this.state.client.patronymic} ref={this.setNewPatronymicRef} name="patronymic" readOnly={this.props.mode === DetailsTypes.Info} className='form-control' placeholder='Enter name client...' aria-label='Name client' aria-describedby='basic-addon2' aria-describedby='basic-addon2' required/>
               </div>    
               <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon3'>Balance</span>
                    </div>
                    <input type='number' defaultValue={this.state.client.balance} ref={this.setNewBalanceRef} name="balance" readOnly={this.props.mode === DetailsTypes.Info} className='form-control' placeholder='Enter price client...' aria-label='Price client' aria-describedby='basic-addon3' aria-describedby='basic-addon3' required/>
                </div> 
                {buttons}
            </div>
        );
    }
}

DetailsClient.defaultProps = {
    mode: DetailsTypes.Info ,
    isEditing: false,
};
  
DetailsClient.propTypes = {
    mode: PropTypes.number, // инфо, создание, редактирование
    id: PropTypes.number,
    surname: PropTypes.string,
    name: PropTypes.string,
    patronymic: PropTypes.string,
    balance: PropTypes.number,
    active: PropTypes.bool
};

export default DetailsClient;