// node_modules
import React from 'react';
import PropTypes from 'prop-types';

// components
import Confirm from '../confirms/Confirm';
import HeaderTable from './HeaderTable';
import RowTable from './RowTable';

import {
  ConfirmTypes,
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
      deleteRowId: null
    };
  }
  selectRow = (id) => {
    this.setState({
      selectedLastId: id
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
    this.setState({
      isConfirm: true,
      deleteRowId: id
    })
  };
  deleteConfirm = (id) => {
    const arrayCopy = this.state.products.filter((row) => row.id !== id);
    const arrayIdsCopy = this.state.selectedIds.filter(i => i !== id);
    this.setState({
      products: arrayCopy,
      selectedIds: arrayIdsCopy,
      isConfirm: false
    });
  };
  cancelConfirm = () => {
    this.setState({
      isConfirm: false
    })
  };
  changedModeSingle = () => {
    this.setState({
      mode: ModeSelectionTable.Single
    })
  };
  changedModeMulti = () => {
    this.setState({
      mode: ModeSelectionTable.Multi
    })
  };

  render() {
    const header = <HeaderTable 
      headers={Object.keys(this.props.products[0])}
      additionalHedaers={['Control']}>
    </HeaderTable>
    
    const body = <tbody>
      {this.state.products.map(p => <RowTable
          key={p.id}
          product={p}
          mode= {this.state.mode}
          selectedLastId= {this.state.selectedLastId}
          selectedIds= {this.state.selectedIds}
          cbDeleteRow= {this.deleteRow}
          cbSelectRow= {this.selectRow}></RowTable>)}
    </tbody>

    const table = <table className='products'>
      {header}
      {body}
    </table>

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
        {this.props.name}
        <div 
           className='btn-group float-right'
           role='group'>
            <div>
              <button onClick= {this.changedModeSingle}
                      className='btn btn-info'
                      title='Получить возможность выбирать только один товар'>
                    <span>Одиночный выбор</span>
              </button>  
              <button onClick= {this.changedModeMulti}
                      className='btn btn-info'
                      title='Получить возможность выбирать только один товар'>
                <span>Мульти выбор</span>
              </button>
            </div>
        </div>
      </h1>
      {table}
      { 
        this.state.isConfirm && 
        confirm 
      }
    </div>
    ) ;
  };
};

ShopTable.defaultProps = {
  mode: ModeSelectionTable.Single
};

ShopTable.propTypes = {
  name: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default ShopTable;