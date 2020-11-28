import React from 'react';
import PropTypes from 'prop-types';

import {
    ModeSelectionTable
} from '../../constants/enums'

class RowTable extends React.Component {

    constructor(props) {
        super(props);
    }

    selectRow = () => {
        this.props.cbSelectRow(this.props.product.id);
    };

    deleteRow = (EO) => {
        EO.stopPropagation();
        this.props.cbDeleteRow(this.props.product.id);
    };

    changeStyle = () => {
        switch (this.props.mode) {
            case ModeSelectionTable.Single:
                return this.props.product.id && this.props.selectedLastId && this.props.product.id === this.props.selectedLastId ? 'selectRow' : '';
            case ModeSelectionTable.Multi:
                return this.props.selectedIds && this.props.selectedIds.length > 0 && this.props.selectedIds.findIndex(i => i === this.props.product.id) !== -1 ? 'selectRow' : '';
            default:
                return '';
        }
    };
    render() {
        let tr_class = this.changeStyle();

        return <tr onClick={this.selectRow} className={tr_class} >
            <td>{this.props.product.id}</td>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.price}</td>
            <td><img src={this.props.product.photo} className='imgIphone'/></td>
            <td>{this.props.product.count}</td>
            <td>{this.props.product.colors.join(', ')}</td>
            <td><a onClick={this.deleteRow}> <i className='fab-custom remove fa fa-trash fa-3x' title='Удалить товар из списка' ></i></a></td>
        </tr>
    };
};

RowTable.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        photo: PropTypes.string,
        count: PropTypes.number,
        colors: PropTypes.array
    }),
    cbDeleteRow: PropTypes.func,
    cbSelectRow: PropTypes.func,
};

export default RowTable;