const e = React.createElement;
const d = React.DOM;
const domConfirm = document.getElementById('confirm');

var ShopTable = React.createClass({
  displayName: 'ShopTable',
  propTypes: {
    name: React.PropTypes.string.isRequired,
    products: React.PropTypes.array.isRequired,
  },
  getInitialState: function () {
    return {
      products: this.props.products,
      selectedIds: []
    };
  },
  selectRow: function (id) {
    const index = this.state.products.findIndex(p => p.id === id);
    const indexId = this.state.selectedIds.findIndex(i => i === id);
    if (index !== -1) {
      if (indexId === -1) {
        this.state.selectedIds.push(id);
      } else {
        this.state.selectedIds.splice(indexId, 1);
      }
    }
  },
  deleteRow: function (id) {
    
    ReactDOM.render(
      React.createElement(Confirm, {
        key: id,
        item: id,
        type: ConfirmTypes.Delete,
        text: `Вы уверены что хотите удалить товар с номером ${id}?`,
        textButton: 'Удалить',
        csActionConfirm: this.deleteConfirm,
        csCancelConfirm: this.cancelConfirm
      }),
      domConfirm
    );
  },
  deleteConfirm: function (id) {
    const arrayCopy = this.state.products.filter((row) => row.id !== id);
    const arrayIdsCopy = this.state.selectedIds.filter(i => i !== id);
    this.setState({
      products: arrayCopy,
      selectedIds: arrayIdsCopy
    });
    ReactDOM.unmountComponentAtNode(domConfirm); 
  },
  cancelConfirm: function () {
    ReactDOM.unmountComponentAtNode(domConfirm); 
  },
  render: function () {
    const header = e(HeaderTable, {
      headers: Object.keys(this.props.products[0])
    });
    const body = d.tbody(null, this.state.products.map((p) => e(RowTable, {
      key: p.id,
      product: p,
      selectedIds: this.state.selectedIds,
      cbDeleteRow: this.deleteRow,
      cbSelectRow: this.selectRow
    })));
    const table = d.table({
        className: 'products'
      },
      header,
      body
    );
    return d.div(null,
      d.h1({
        className: 'title'
      }, this.props.name),
      table,
    );
  },
});