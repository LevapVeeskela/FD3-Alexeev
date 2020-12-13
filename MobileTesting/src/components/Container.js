import React, {
  PureComponent
} from 'react';

import Table from './table/Table';

class Container extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
        ...props,
    }
  }
  
  render() {
    console.log('Conteiner')
    return (
      <div>
          <Table/>
      </div>)
  }
};

export default Container; 