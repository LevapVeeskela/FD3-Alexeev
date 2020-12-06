// node_modules
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Confirm from '../confirms/Confirm';
import HeaderTable from './HeaderTable';
import RowTable from './RowTable';
import DetailsClient from '../details-clients/DetailsClient';

import {
  ConfirmTypes,
  DetailsTypes,
} from '../../constants/enums';

class Table extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      clients: props.clients,
      isConfirm: false,
      deleteRowId: null,
      modeDetails: null, 
    };
  }

  isEditing = false;

  deleteRow = (id) => {
    if(this.state.modeDetails === DetailsTypes.Create){
      confirm(`In the process of create new client!`)
      return;
    }

    if(this.isEditing && this.state.modeDetails === DetailsTypes.Edit){
      confirm(`Client with id:${this.state.selectedLastId} in the process of change!`)
      return;
    }

    this.setState({
      isConfirm: true,
      deleteRowId: id,
      modeDetails: this.state.selectedLastId ?  DetailsTypes.Info : null
    })
  };

  deleteConfirm = (id) => {
    this.setState({
      clients: this.state.clients.filter((row) => row.id !== id),
      isConfirm: false,
      modeDetails: null,
    });
  };

  cancelConfirm = () => {
    this.setState({
      isConfirm: false
    })
  };

  editClient = (id) => {
    if(this.state.modeDetails === DetailsTypes.Create) {
      confirm(`In the process of create new client!`)
      return;
    }

    this.state.modeDetails = DetailsTypes.Edit;
    this.state.selectedLastId = id;
    if(!this.state.selectedIds.includes(id)){
      this.state.selectedIds.push(id)
    }
    this.setState({...this.state})
  };

  cancelClient = () => {
    this.isEditing = false;
    this.setState({
      modeDetails: null
    })
  };

  addClient= (client) => {
    const clients = [...this.state.clients];
    client.id = Math.max(...this.state.clients.map(p => p.id)) + 1;
    clients.push(client);
    this.setState({
      clients: clients,
      modeDetails: null,  
    })
  };

  saveClient = (client) => {
    const clients = [...this.state.clients];
    clients[this.state.clients.findIndex(p => p.id === this.state.selectedLastId)] = client;
    this.setState({
      clients: clients
    });
    this.isEditing = false;
  };

  changeIsEditing = (isEditing) => {
    this.isEditing = isEditing;
  }

  showCreateDialog = () => {
    if(this.isEditing && this.state.modeDetails === DetailsTypes.Edit){
      confirm(`Client with id:${this.state.selectedLastId} in the process of change!`)
      return;
    }
    this.setState({
      modeDetails: DetailsTypes.Create
    })
  }

  render() {
    console.log('Table')
    const header = <HeaderTable 
      headers={Object.keys(this.props.clients[0])}
      additionalHedaers={['Control']}>
    </HeaderTable>
    
    const body = <tbody>
      {this.state.clients.map(c => <RowTable
          key={c.id}
          client={c}
          modeDetails={this.state.modeDetails}
          isEditing={this.isEditing}>
        </RowTable>)}
    </tbody>

    const table = <table className='clients'>
      {header}
      {body}
    </table>

    const details = ( 
      this.state.modeDetails ? 
          (<div className='row offset-2'>
            <DetailsClient cbCancel={this.cancelClient} mode={this.state.modeDetails} cbChangeIsEditing={this.changeIsEditing} cbAdd={this.addClient} cbSave={this.saveClient} client={this.state.modeDetails ===  DetailsTypes.Create ? new ClientModel().defaultValues() : this.state.clients.find(p => p.id === this.state.selectedLastId)}></DetailsClient>
          </div>)
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
        {this.props.company}
      </h1>
      {table}
      <button  onClick= {this.showCreateDialog}
              className='btn btn-success'
              title='Add new client'>
            <i className='fa fa-plus'></i>
            <span style={{marginLeft: "10px"}}>Add new client</span>
      </button>  
      {details}
      { 
        this.state.isConfirm && 
        confirm 
      }
    </div>
    ) ;
  };
};

Table.propTypes = {
  company: PropTypes.string.isRequired,
  clients: PropTypes.array.isRequired,
};

export default Table;