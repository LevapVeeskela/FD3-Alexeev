import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    DetailsTypes
} from '../../constants/enums'

import {SelectClassStatus, SelectTextStatus} from '../../helpers/RowHelper'
import './RowTable.css';

class RowTable extends PureComponent {
    deleteRow = (EO) => {
        EO.stopPropagation();
    }; 

    editclient = (EO) => {
        EO.stopPropagation();
    };


    render() {
        console.log('RowTable');
        return (
        <tr>
            <td>{this.props.client.id}</td>
            <td>{this.props.client.surname}</td>
            <td>{this.props.client.name}</td>
            <td>{this.props.client.patronymic}</td>
            <td>{this.props.client.balance}</td>
            <td className={SelectClassStatus(this.props.client.active)}>{SelectTextStatus(this.props.client.active)}</td>
            <td>
                <button disabled={this.props.selectedLastId === this.props.client.id && this.props.modeDetails === DetailsTypes.Edit} onClick={this.editclient} style={{border: 0, padding: 0}}> <i className='fab-custom edit fa fa-edit fa-3x' title='Editing client'></i></button>
                <a onClick={this.deleteRow}><i className='fab-custom remove fa fa-trash fa-3x' title='Delete client'></i></a>
            </td>
        </tr>
        );
    };
};

RowTable.propTypes = {
    client: PropTypes.shape({
        id: PropTypes.number,
        surname: PropTypes.string,
        name: PropTypes.string,
        patronymic: PropTypes.string,
        balance: PropTypes.number,
        active: PropTypes.bool
    }),
    modeDetails: PropTypes.number,
};

export default RowTable;