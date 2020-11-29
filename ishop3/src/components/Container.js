  import React from 'react';

  import ShopTable from './table/ShopTable';

  import {
    ModeSelectionTable
  } from '../constants/enums';

  const DataShops = require('../../public/data.json');

  class Container extends React.Component {
    render() {
      const tables = DataShops.map(m => 
      <ShopTable
        key= {m.id}
        name= {m.name}
        products= {m.products}
        mode= {ModeSelectionTable.Single}>
        </ShopTable>
      );

      return <div>{tables}</div>
    }
  };

  export default Container; 