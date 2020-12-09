// node_modules
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Confirm from '../confirms/Confirm';
import HeaderTable from './HeaderTable';
import RowTable from './RowTable';
import DetailsClient from '../details-clients/DetailsClient';
import CompanyButtons from '../company-buttons/CompanyButtons';

// enums
import { Filters } from '../../constants/enums';

// streams events
import { dataEvents, companyEvents } from '../events';

// models
import { ClientModel } from './models/ClientModel'; 

import {
  ConfirmTypes,
  DetailsTypes,
} from '../../constants/enums';

import Data from '../../../public/data.json';

const data = [...Data];

class Table extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      ...props,
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
        clients: clients
      })
  }

  deleteRow = (id) => {
    this.setState({
      isConfirm: true,
      deleteRowId: id,
      modeDetails: this.state.selectedLastId ?  DetailsTypes.Info : null
    })
  };

  deleteConfirm = (id) => {
    const newData = [...this.state.data];
    const changeClientsCompany = newData.find(c => c.company === this.state.company);
    changeClientsCompany.clients = changeClientsCompany.clients.filter(c => c.id !== id);
    
    this.setState({
      data: newData,
      clients: this.state.clients.filter(c => c.id !== id),
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
    this.setState({
      modeDetails: null
    })
  };

  addClient= (client) => {
    const clients = [...this.state.clients];
    client.id = Math.max(...this.state.clients.map(p => p.id)) + 1;
    clients.push(client);

    const newData = [...this.state.data];
    const changeClientsCompany = newData.find(c => c.company === this.state.company);
    changeClientsCompany.clients = clients;

    this.setState({
      data: changeClientsCompany,
      clients: clients,
      modeDetails: null,  
    })
  };

  saveClient = (client) => {
    const clients = [...this.state.clients];
    clients[this.state.clients.findIndex(p => p.id === client.id)] = client;

    const newData = [...this.state.data];
    const changeClientsCompany = newData.find(c => c.company === this.state.company);
    changeClientsCompany.clients = clients;

    this.setState({
      data: newData,
      clients: clients,
      selectClient: client
    });
  };

  showCreateDialog = () => {
    if(this.state.modeDetails !== DetailsTypes.Create){
      dataEvents.emit('EChangeSelectClient', new ClientModel().defaultValues());
      this.setState({
        modeDetails: DetailsTypes.Create
      })
    }
  }

  changeFilter = (EO) => {
    console.log(EO.target.name)
  }  

  render() {
    console.log('Table')
    const filters = (
    <div className='btn-group float-left'
      role='group'>
      <div>
        <button onClick= {this.changeFilter}
                className='btn btn-success' 
                name={Filters.All}
                title='Will show all clients of current company'>
              <span>All</span>
        </button>  
        <button onClick= {this.changeFilter}
                className='btn btn-success'
                name={Filters.Active}
                title='Will show active clients of current company only'>
          <span>Active</span>
        </button>
          <button onClick= {this.changeFilter}
                className='btn btn-success'
                name={Filters.Blocked}
                title='Will show blocked clients of current company only'>
          <span>Blocked</span>
        </button>
      </div>
  </div>)

    const header = (<HeaderTable headers={Object.keys(this.props.clients[0])} additionalHedaers={['Control']}/>)
    const body = (<tbody>
      {this.state.clients.map(c => <RowTable
          key={c.id}
          client={c}
          selectClient={this.state.selectClient}
          >
        </RowTable>)}
    </tbody>)

    const table = (<table className='clients'>
      {header}
      {body}
    </table>)

    const details = ( 
      this.state.modeDetails ? 
          (<div className='row offset-2'>
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
      <CompanyButtons data={this.state.data}/>

      <h1 className='title'>
        {filters}
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
  data: data,
  company: data[0].company,
  clients: data[0].clients
}

Table.propTypes = {
  company: PropTypes.string,
  clients: PropTypes.array,
};

export default Table;