// node_modules
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// components
import Confirm from '../confirms/Confirm';
import HeaderTable from './HeaderTable';
import RowTable from './RowTable';
import DetailsProduct from '../details-product/DetailsProduct';

// models
import {ProductModel} from './models/ProductModel';

import {
  ConfirmTypes,
  DetailsTypes,
  ModeSelectionTable
} from '../../constants/enums';

class ShopTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.products,
      selectedIds: [],
      selectedLastId: null,
      mode: props.mode,
      isConfirm: false,
      deleteRowId: null,
      modeDetails: null, 
    };
  }

  isEditing = false;

  selectRow = (id) => {
    if(this.state.modeDetails === DetailsTypes.Create){
      confirm(`In the process of create new product!`)
      return;
    }
    
    if(this.isEditing && this.state.modeDetails === DetailsTypes.Edit){
      confirm(`Product with id:${this.state.selectedLastId} in the process of change!`)
      return;
    }


    this.setState({
      selectedLastId: id,
      modeDetails: DetailsTypes.Info
    })

    if (this.state.mode === ModeSelectionTable.Single) {
      return;
    }

    const index = this.state.products.findIndex(p => p.id === id);
    const indexId = this.state.selectedIds.findIndex(i => i === id);
    if (index !== -1) {
      if (indexId === -1) {
        this.state.selectedIds.push(id);
      } else {
        this.state.selectedIds.splice(indexId, 1);
      }
    }
  };

  deleteRow = (id) => {
    if(this.state.modeDetails === DetailsTypes.Create){
      confirm(`In the process of create new product!`)
      return;
    }

    if(this.isEditing && this.state.modeDetails === DetailsTypes.Edit){
      confirm(`Product with id:${this.state.selectedLastId} in the process of change!`)
      return;
    }

    this.setState({
      isConfirm: true,
      deleteRowId: id,
      modeDetails: DetailsTypes.Info
    })
  };

  deleteConfirm = (id) => {
    const arrayCopy = this.state.products.filter((row) => row.id !== id);
    const arrayIdsCopy = this.state.selectedIds.filter(i => i !== id);
    this.setState({
      products: arrayCopy,
      selectedIds: arrayIdsCopy,
      isConfirm: false,
      modeDetails: null,
    });
  };

  cancelConfirm = () => {
    this.setState({
      isConfirm: false
    })
  };

  changedModeSingle = () => {
    if(this.state.modeDetails === DetailsTypes.Create){
      confirm(`In the process of create new product!`)
      return;
    }
    if(this.isEditing && this.state.modeDetails === DetailsTypes.Edit){
      confirm(`Product with id:${this.state.selectedLastId} in the process of change!`)
      return;
    }
    this.setState({
      mode: ModeSelectionTable.Single
    })
  };

  changedModeMulti = () => {
    if(this.state.modeDetails === DetailsTypes.Create){
      confirm(`In the process of create new product!`)
      return;
    }
    if(this.isEditing && this.state.modeDetails === DetailsTypes.Edit){
      confirm(`Product with id:${this.state.selectedLastId} in the process of change!`)
      return;
    }
    this.setState({
      mode: ModeSelectionTable.Multi
    })
  };

  editProduct = (id) => {
    if(this.state.modeDetails === DetailsTypes.Create) {
      confirm(`In the process of create new product!`)
      return;
    }

    this.state.modeDetails = DetailsTypes.Edit;
    this.state.selectedLastId = id;
    if(!this.state.selectedIds.includes(id)){
      this.state.selectedIds.push(id)
    }
    this.setState({...this.state})
  };

  cancelProduct = () => {
    this.isEditing = false;
    this.setState({
      modeDetails: null
    })
  };

  addProduct= (product) => {
    product.id = Math.max(...this.state.products.map(p => p.id)) + 1;
    this.state.products.push(product);
    this.setState({
      products: [...this.state.products],
      modeDetails: null,  
    })
  };

  saveProduct = (product) => {
    this.state.products[this.state.products.findIndex(p => p.id === this.state.selectedLastId)] = product;
    this.setState({
      products: [...this.state.products] 
    });
    this.isEditing = false;
  };

  changeIsEditing = (isEditing) => {
    this.isEditing = isEditing;
  }

  showCreateDialog = () => {
    if(this.isEditing && this.state.modeDetails === DetailsTypes.Edit){
      confirm(`Product with id:${this.state.selectedLastId} in the process of change!`)
      return;
    }
    this.setState({
      modeDetails: DetailsTypes.Create
    })
  }

  render() {
    const header = <HeaderTable 
      headers={Object.keys(this.props.products[0])}
      additionalHedaers={['Control']}>
    </HeaderTable>
    
    const body = <tbody>
      {this.state.products.map(p => <RowTable
          key={p.id}
          product={p}
          mode={this.state.mode}
          selectedLastId={this.state.selectedLastId}
          selectedIds={this.state.selectedIds}
          modeDetails={this.state.modeDetails}
          isEditing={this.isEditing}
          cbEditProduct={this.editProduct}
          cbDeleteRow= {this.deleteRow}
          cbSelectRow= {this.selectRow}>
        </RowTable>)}
    </tbody>

    const table = <table className='products'>
      {header}
      {body}
    </table>

    const details = ( 
      this.state.modeDetails ? 
        (this.state.mode === ModeSelectionTable.Single ||  this.state.modeDetails === DetailsTypes.Edit || this.state.modeDetails ===  DetailsTypes.Create ? 
          (<div className='row offset-2'>
            <DetailsProduct cbCancel={this.cancelProduct} mode={this.state.modeDetails} cbChangeIsEditing={this.changeIsEditing} cbAdd={this.addProduct} cbSave={this.saveProduct} product={this.state.modeDetails ===  DetailsTypes.Create ? new ProductModel().defaultValues() : this.state.products.find(p => p.id === this.state.selectedLastId)}></DetailsProduct>
          </div>) 
          : (<div className="row offset-1">
              {this.state.products.filter(p => this.state.selectedIds.includes(p.id)).map((p) => (<div className="row col-6" key={p.id}><DetailsProduct cbChangeIsEditing={this.changeIsEditing} mode={this.state.modeDetails} product={p}></DetailsProduct></div>))}
            </div>
            )
        )
      : null
    );
    
    const confirm = <Confirm
      key= {this.state.deleteRowId}
      item= {this.state.deleteRowId}
      type={ConfirmTypes.Delete}
      text= {`Вы уверены что хотите удалить товар с номером ${this.state.deleteRowId}?`}
      textButton= 'Удалить'
      csActionConfirm= {this.deleteConfirm}
      csCancelConfirm= {this.cancelConfirm}
    >
    </Confirm>
    
    return (
    <div>
      <h1 className='title'>
      <div className='float-left'>
            <div>
              <button  onClick= {this.showCreateDialog}
                      className='btn btn-success'
                      title='Create new product'>
                    <i className='fa fa-plus'></i>
                    <span style={{marginLeft: "10px"}}>Create new product</span>
              </button>  
            </div>
        </div>
        {this.props.name}
        <div 
           className='btn-group float-right'
           role='group'>
            <div>
              <button onClick= {this.changedModeSingle}
                      className='btn btn-info'
                      title='Will get opportunity to select one product only'>
                    <span>Одиночный выбор</span>
              </button>  
              <button onClick= {this.changedModeMulti}
                      className='btn btn-info'
                      title='Will get opportunity to select several products'>
                <span>Мульти выбор</span>
              </button>
            </div>
        </div>
      </h1>
      {table}
      {details}
      { 
        this.state.isConfirm && 
        confirm 
      }
    </div>
    ) ;
  };
};

ShopTable.defaultProps = {
  mode: ModeSelectionTable.Single,
};

ShopTable.propTypes = {
  name: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default ShopTable;