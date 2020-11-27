const ShopTable = React.createClass({
  displayName: 'ShopTable',
  getDefaultProps: function () {
    return {
      mode: ModeSelectionTable.Single
    }
  },
  propTypes: {
    name: React.PropTypes.string.isRequired,
    products: React.PropTypes.array.isRequired,
  },
  getInitialState: function () {
    return {
      products: this.props.products,
      selectedIds: [],
      selectedLastId: null,
      mode: this.props.mode,
      isConfirm: false,
      deleteRowId: null
    };
  },
  selectRow: function (id) {
    this.setState({
      selectedLastId: id
    })

    if (this.state.mode === ModeSelectionTable.Single) {
      return;
    }

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
    this.setState({
      isConfirm: true,
      deleteRowId: id
    })
  },
  deleteConfirm: function (id) {
    const arrayCopy = this.state.products.filter((row) => row.id !== id);
    const arrayIdsCopy = this.state.selectedIds.filter(i => i !== id);
    this.setState({
      products: arrayCopy,
      selectedIds: arrayIdsCopy,
      isConfirm: false
    });
  },
  cancelConfirm: function () {
    this.setState({
      isConfirm: false
    })
  },
  changedModeSingle: function () {
    this.setState({
      mode: ModeSelectionTable.Single
    })
  },
  changedModeMulti: function () {
    this.setState({
      mode: ModeSelectionTable.Multi
    })
  },
  render: function () {
    const header = e(HeaderTable, {
      headers: Object.keys(this.props.products[0]),
      additionalHedaers: ['Control']
    });
    const body = d.tbody(null, this.state.products.map((p) => e(RowTable, {
      key: p.id,
      product: p,
      mode: this.state.mode,
      selectedLastId: this.state.selectedLastId,
      selectedIds: this.state.selectedIds,
      cbDeleteRow: this.deleteRow,
      cbSelectRow: this.selectRow,
    })));
    const table = d.table({
        className: 'products'
      },
      header,
      body
    );
    const confirm = e(Confirm, {
      key: this.state.deleteRowId,
      item: this.state.deleteRowId,
      type: ConfirmTypes.Delete,
      text: `Вы уверены что хотите удалить товар с номером ${this.state.deleteRowId}?`,
      textButton: 'Удалить',
      csActionConfirm: this.deleteConfirm,
      csCancelConfirm: this.cancelConfirm
    });
    return d.div(null,
      d.h1({
        className: 'title'
      }, this.props.name, d.div({
        className: 'btn-group float-right',
        'role': 'group',
      }, d.div(null, d.button({
          onClick: this.changedModeSingle,
          className: 'btn btn-info',
          title: 'Получить возможность выбирать только один товар'
        }, d.span(null, 'Одиночный выбор')),
        d.button({
          onClick: this.changedModeMulti,
          className: 'btn btn-info',
          title: 'Получить возможность выбирать несколько товаров'
        }, d.span(null, 'Мульти выбор'))))),
      table,
      this.state.isConfirm ? confirm : null
    );
  },
});
