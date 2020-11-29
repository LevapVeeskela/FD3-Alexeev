import React from 'react';
import PropTypes from 'prop-types';

import {
    DetailsTypes
} from '../../constants/enums';
import { TextModeInfo } from '../../helpers/DetailsProductHelper';

class DetailsProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            product: props.product
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            product:  props.product
        };
    }

    render(){
        const buttons =  ( this.props.mode === DetailsTypes.Create || this.props.mode === DetailsTypes.Edit ? 
            <div className='row'>
                <button type="button" className="btn btn-success">{this.props.mode === DetailsTypes.Create ? 'Add' : 'Save'}</button>
                <button type="button" className="btn btn-danger">Отмена</button>
            </div> 
            : null
        );

        return (
            <div className='col-4'>
                <h5>
                    {TextModeInfo(this.props.mode, this.state.product)}
                </h5>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon1'>Id</span>
                    </div>
                    <input type='text' defaultValue={this.state.product.id} className='form-control' readOnly aria-describedby='basic-addon1'/>
                </div>  
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon2'>Name</span>
                    </div>
                    <input type='text' value={this.state.product.name} readOnly={this.props.mode === DetailsTypes.Info} className='form-control' placeholder='Name product' aria-label='Name product' aria-describedby='basic-addon2' aria-describedby='basic-addon2'/>
                </div>    
               <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon3'>Price</span>
                    </div>
                    <input type='text' value={this.state.product.price} readOnly={this.props.mode === DetailsTypes.Info} className='form-control' placeholder='Price product' aria-label='Price product' aria-describedby='basic-addon3' aria-describedby='basic-addon3'/>
                </div> 
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon4'>Photo</span>
                    </div>
                    <input type='text' value={this.state.product.photo} readOnly={this.props.mode === DetailsTypes.Info} className='form-control' id='basic-url' aria-describedby='basic-addon4'/>
                </div>              
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text' id='basic-addon5'>Count</span>
                    </div>
                    <input type='number' value={this.state.product.count} readOnly={this.props.mode === DetailsTypes.Info} className='form-control' placeholder='Count in stock' aria-label='Count in stock' aria-describedby='basic-addon5' aria-describedby='basic-addon5'/>
                </div>
                <div className='input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Сolors</span>
                    </div>
                    <textarea value={this.state.product.colors.join('\n')} rows={this.state.product.colors.length} readOnly={this.props.mode === DetailsTypes.Info} className='form-control' aria-label='With textarea'></textarea>
                </div> 
                {buttons}
            </div>
        );
    }
}

DetailsProduct.defaultProps = {
    mode: DetailsTypes.Info 
};
  
DetailsProduct.propTypes = {
    mode: PropTypes.number, // инфо, создание, редактирование
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        photo: PropTypes.string,
        count: PropTypes.number,
        colors: PropTypes.array
    }),
    cbAdd: PropTypes.func,
    cbSave: PropTypes.func,
    cbCancel: PropTypes.func,
};

export default DetailsProduct;