  import React from 'react';

  import ShopTable from './table/ShopTable';

  import {
    ModeSelectionTable
  } from '../constants/enums';

  const DataShops = require('../../public/data.json');

  const Container = React.createClass({
    displayName: 'Container',
    render: function () {
      const tables = DataShops.map(m =>
        React.createElement(ShopTable, {
          key: m.id,
          name: m.name,
          products: m.products,
          mode: ModeSelectionTable.Single
        })
      );

      return React.DOM.div(null, tables)
    },
  });

  export default Container;
