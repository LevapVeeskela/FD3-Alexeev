var FirstHomework = React.createClass({
  displayName: 'FirstHomework',
  render: function () {
    var tables = DataShops.map(m =>
      React.createElement(ShopTable, {
        key: m.id,
        name: m.name,
        products: m.products
      })
    );

    return React.DOM.div({}, tables)
  },
});
