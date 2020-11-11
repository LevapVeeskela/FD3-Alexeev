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

    return d.div(null, tables)
  },
});
