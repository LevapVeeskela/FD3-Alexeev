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
        ...props
    }
  }
  
  render() {
    console.log('Conteiner')
    return (
      <div>
          <CompanyButtons/>
          <Table/>
      </div>)
  }
};

export default Container; 