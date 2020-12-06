import React, {
  PureComponent
} from 'react';

import Table from './table/Table';

import {
  companyEvents
} from './events'
import CompanyButtons from './company-buttons/CompanyButtons';

class Container extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
        ...props,
        data: null
    }
}
  componentDidMount = () => {
    companyEvents.addListener('EChangeCompany',this.changeCompany);
  };

  componentWillUnmount = () => {
    companyEvents.removeListener('EChangeCompany',this.changeCompany);
  };

  changeCompany = (data) => {
    this.setState({
      data: data
    })
  }
  
  render() {
    console.log('Conteiner')
    const table = this.state.data ? <Table company={this.state.data.company} clients={this.state.data.clients}/> : null;
    return (
      <div>
          <CompanyButtons/>
        {table}
      </div>)
  }
};

export default Container; 