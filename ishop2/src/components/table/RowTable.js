const RowTable = React.createClass({
    displayName: 'RowTable',
    propTypes: {
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        price: React.PropTypes.number,
        photo: React.PropTypes.string,
        count: React.PropTypes.number,
        colors: React.PropTypes.array,
        cbDeleteRow: React.PropTypes.func.isRequired,
        cbSelectRow: React.PropTypes.func.isRequired,
    },
    getInitialState: function () {
        return {
            isSelect: false,
        };
    },
    selectRow: function () {
        this.props.cbSelectRow(this.props.product.id)
        this.setState({
            isSelect: !this.state.isSelect
        })
    },
    deleteRow: function () {
        this.props.cbDeleteRow(this.props.product.id)
    },
    render: function () {
        let tr_class = this.props.selectedIds.findIndex(i => i === this.props.product.id) !== -1 ? "selectRow" : "";

        return e('tr', {
                onClick: this.selectRow,
                className: tr_class
            },
            d.td(null, this.props.product.id),
            d.td(null, this.props.product.name),
            d.td(null, `${this.props.product.price}$`),
            d.td(null, e('img', {
                src: this.props.product.photo,
                className: 'imgIphone'
            })),
            d.td(null, this.props.product.count),
            d.td(null, this.props.product.colors.join(', ')),
            d.td(null, d.a({
                onClick: this.deleteRow
            }, d.i({
                className: 'fab remove fa fa-trash fa-3x',
                title: 'Удалить товар из списка'
            }))),
        );
    },
});