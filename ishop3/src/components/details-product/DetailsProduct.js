import React from 'react';
import PropTypes from 'prop-types';

import {
    DetailsTypes
} from '../../constants/enums';
import { TextModeInfo, CastToNeedType } from '../../helpers/DetailsProductHelper';

import './DetailsProduct.css'
class DetailsProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            product: {...props.product}, 
            validRules: this.getValidateRules(props)
        };
    }

    getValidateRules = (store) => {
        return {
            name: `${store.product.name.length > 0 ? 'is-valid' : 'is-invalid'}`,
            price: `${store.product.price > 0 ? 'is-valid' : 'is-invalid'}`,
            photo: `${store.product.photo.length > 0 ? 'is-valid' : 'is-invalid'}`,
            count: `${store.product.count > 0 ? 'is-valid' : 'is-invalid'}`,
            colors: `${store.product.colors.length > 0 ? 'is-valid' : 'is-invalid'}`,
        };
    }

    UNSAFE_componentWillReceiveProps = (newProps) => { 
        this.state.validRules = this.getValidateRules(newProps)
        this.setState({
            ...this.state,
            product:  newProps.product,
        })
    };

    // static getDerivedStateFromProps(newProps, prevState) { // вызывается при обновление state и получение новых свойств
    //     console.log(arguments)
    //     return {
    //         ...prevState,
    //         product:  newProps.product,
    //     };
    // }
    
    changeValue = (EO) => {
        this.state.product = { ...this.state.product,
            [EO.target.name]: CastToNeedType(EO.target.value, EO.target.name)
        };
        this.state.validRules = this.getValidateRules(this.state);
        this.props.cbChangeIsEditing(JSON.stringify(this.props.product) !== JSON.stringify(this.state.product));
        this.setState({
            ...this.state
        })
    }

    cancelProduct = () => {
        this.props.cbCancel();
    }

    addProduct = () => {
        this.props.cbAdd(this.state.product);
    }  

    saveProduct = () => {
        this.props.cbSave(this.state.product);
    }

    render(){
        const isDisabled = Object.values(this.state.validRules).includes('is-invalid');

        const buttons = (this.props.mode === DetailsTypes.Create || this.props.mode === DetailsTypes.Edit ? 
            <div className='button-details'>
                <div className='row'>
                    {   this.props.mode === DetailsTypes.Create ?
                        <button type="button" disabled={isDisabled} onClick={this.addProduct} className="btn btn-success">Add</button> :
                        <button type="button" disabled={isDisabled} onClick={this.saveProduct} className="btn btn-success">Save</button>
                    }
                    <button type="button" onClick={this.cancelProduct} style={{marginLeft: "10px"}} className="btn btn-danger">Отмена</button>
                </div>
            </div> 
            : null
        );

        return (
            <div className='col-10 form-control' style={{marginTop: "20px"}}>
                <h5>
                    {TextModeInfo(this.props.mode, this.props.product)}
                </h5>
                { this.props.mode === DetailsTypes.Info &&
                    (<div className='input-group mb-3'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text' id='basic-addon1'>Id</span>
                        </div>
                        <input type='text' value={this.state.product.id} className='form-control' readOnly aria-describedby='basic-addon1'/>
                    </div>) 
                }  
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon2'>Name</span>
                    </div>
                    <input type='text' value={this.state.product.name} onChange={this.changeValue} name="name" readOnly={this.props.mode === DetailsTypes.Info} className={`form-control ${this.props.mode === DetailsTypes.Info ? '' : this.state.validRules.name}`} placeholder='Enter name product...' aria-label='Name product' aria-describedby='basic-addon2' aria-describedby='basic-addon2' required/>
               </div>    
               <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon3'>Price</span>
                    </div>
                    <input type='number' value={this.state.product.price} onChange={this.changeValue} name="price" readOnly={this.props.mode === DetailsTypes.Info} className={`form-control ${this.props.mode === DetailsTypes.Info ? '' : this.state.validRules.price}`}  placeholder='Enter price product...' aria-label='Price product' aria-describedby='basic-addon3' aria-describedby='basic-addon3' required/>
                </div> 
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon4'>Photo</span>
                    </div>
                    <input type='text' value={this.state.product.photo} onChange={this.changeValue} name="photo" readOnly={this.props.mode === DetailsTypes.Info} className={`form-control ${this.props.mode === DetailsTypes.Info ? '' : this.state.validRules.photo}`}  placeholder='Enter URL photo product...' id='basic-url' aria-describedby='basic-addon4' required/>
                </div>              
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon5'>Count</span>
                    </div>
                    <input type='number' value={this.state.product.count} onChange={this.changeValue} name="count" readOnly={this.props.mode === DetailsTypes.Info} className={`form-control ${this.props.mode === DetailsTypes.Info ? '' : this.state.validRules.count}`}  placeholder='Enter count in stock' aria-label='Count in stock' aria-describedby='basic-addon5' aria-describedby='basic-addon5' required/>
                </div>
                <div className='input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Сolors</span>
                    </div>
                    <textarea value={this.state.product.colors.join('\n')} onChange={this.changeValue} name="colors" rows={this.state.product.colors.length} readOnly={this.props.mode === DetailsTypes.Info} className={`form-control ${this.props.mode === DetailsTypes.Info ? '' : this.state.validRules.colors}`} placeholder='Enter colors product...' aria-label='With textarea' required></textarea>
                </div> 
                {buttons}
            </div>
        );
    }
}

DetailsProduct.defaultProps = {
    mode: DetailsTypes.Info ,
    isEditing: false,
  
};
  
DetailsProduct.propTypes = {
    mode: PropTypes.number, // инфо, создание, редактирование
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        photo: PropTypes.string,
        count: PropTypes.number,
        colors: PropTypes.array
    }),
    cbAdd: PropTypes.func,
    cbSave: PropTypes.func,
    cbCancel: PropTypes.func,
};

export default DetailsProduct;