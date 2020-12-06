// node_modules
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Data from '../../../public/data.json';

// components
import Confirm from '../confirms/Confirm';
import HeaderTable from './HeaderTable';
import RowTable from './RowTable';
import DetailsClient from '../details-clients/DetailsClient';

// streams events
import { dataEvents, companyEvents } from '../events';

// models
import { ClientModel } from './models/ClientModel'; 

import {
  ConfirmTypes,
  DetailsTypes,
} from '../../constants/enums';

class Table extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.company,
      clients: this.props.clients,
      selectClient: null,
      isConfirm: false,
      deleteRowId: null,
      modeDetails: null, 
    };
  }

  componentDidMount = () => {
    companyEvents.addListener('EChangeCompany',this.changeCompany);
    dataEvents.addListener('EChangeSelectClient', this.changeSelectRow);
    dataEvents.addListener('EDeleteClient', this.deleteRow);
    dataEvents.addListener('EEditClient', this.editClient);
    dataEvents.addListener('ECancelClient', this.cancelClient);
    dataEvents.addListener('EAddClient', this.addClient);
    dataEvents.addListener('ESaveClient', this.saveClient);
  };

  componentWillUnmount = () => {
    companyEvents.removeListener('EChangeCompany',this.changeCompany);
    dataEvents.removeListener('EChangeSelectClient', this.changeSelectRow);
    dataEvents.removeListener('EDeleteClient', this.deleteRow);
    dataEvents.removeListener('EEditClient', this.editClient);
    dataEvents.removeListener('ECancelClient', this.cancelClient);
    dataEvents.removeListener('EAddClient', this.addClient);
    dataEvents.removeListener('ESaveClient', this.saveClient);
  };
  
  changeSelectRow = (client) => {
    this.setState({
        selectClient: client,
        modeDetails: DetailsTypes.Info
    })
  }

  changeCompany = (data) => {
    const { clients, company } = data;
    this.setState({
        company: company,
        clients: [...clients]
      })
  }

  isEditing = false;

  deleteRow = (id) => {
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

  editClient = (client) => {
    this.setState({
      selectClient: client,
      modeDetails:  DetailsTypes.Edit
    })
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

    const data = Data.find(c => c.company === this.props.company);
    if(data) 
      data.clients.push(client);

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
    if(this.state.modeDetails !== DetailsTypes.Create){
      dataEvents.emit('EChangeSelectClient', new ClientModel().defaultValues());
      this.setState({
        modeDetails: DetailsTypes.Create
      })
    }
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
          selectClient={this.state.selectClient}
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
            {/* <DetailsClient cbCancel={this.cancelClient} cbChangeIsEditing={this.changeIsEditing} cbAdd={this.addClient} cbSave={this.saveClient} mode={this.state.modeDetails}  client={this.state.modeDetails ===  DetailsTypes.Create ? new ClientModel().defaultValues() : this.state.clients.find(p => p.id === this.state.selectedLastId)}></DetailsClient> */}
            <DetailsClient mode={this.state.modeDetails} client={this.state.modeDetails === DetailsTypes.Create ? new ClientModel().defaultValues() : this.state.selectClient}></DetailsClient>
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
        {this.state.company}
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

Table.defaultProps = {
  clients: Data[0].clients,
  company: Data[0].company
};

Table.propTypes = {
  company: PropTypes.string,
  clients: PropTypes.array,
};

export default Table;