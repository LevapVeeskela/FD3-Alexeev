const ShopTable = React.createClass({
  displayName: 'ShopTable',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    products: React.PropTypes.array.isRequired,
  },
  render: function () {
    const products = this.props.products;

    function renderTableHeader() {
      let header = Object.keys(products[0])
      return header.map((key, index) => {
        return React.createElement('th', {
          key: index
        }, key.toUpperCase())
      })
    }

    function renderTableData() {
      return products.map((product) => {
        const {
          id,
          name,
          price,
          photo,
          count,
          colors
        } = product;
        return React.createElement('tr', {
            key: id
          },
          React.DOM.td({}, id),
          React.DOM.td({}, name),
          React.DOM.td({}, `${price}$`),
          React.DOM.td({}, React.createElement('img', {
            src: photo,
            className: 'imgIphone'
          })),
          React.DOM.td({}, count),
          React.DOM.td({}, colors.join(', ')),
        )
      })
    };
    const header = React.DOM.thead({}, React.DOM.tr({}, renderTableHeader()));
    const body = React.DOM.tbody({}, renderTableData());
    const table = React.DOM.table({
        className: 'products'
      },
      header,
      body
    );
    return React.DOM.div({},
      React.DOM.h1({
        className: 'title'
      }, this.props.name),
      table
    );
  },
});