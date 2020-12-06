import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    DetailsTypes
} from '../../constants/enums'

import {SelectClassStatus, SelectTextStatus} from '../../helpers/RowHelper'
import './RowTable.css';
import { dataEvents } from '../events';

class RowTable extends PureComponent {
    deleteClient = (EO) => {
        EO.stopPropagation();
        dataEvents.emit('EDeleteClient', this.props.client.id)
    }; 

    editClient = (EO) => {
        EO.stopPropagation();
        dataEvents.emit('EEditClient', this.props.client)
    };

    selectClient = () => {
        dataEvents.emit('EChangeSelectClient', this.props.client)
    }
    
    render() {
        console.log('RowTable');
        return (
        <tr onClick={this.selectClient}>
            <td>{this.props.client.id}</td>
            <td>{this.props.client.surname}</td>
            <td>{this.props.client.name}</td>
            <td>{this.props.client.patronymic}</td>
            <td>{this.props.client.balance}</td>
            <td className={SelectClassStatus(this.props.client.active)}>{SelectTextStatus(this.props.client.active)}</td>
            <td>
                <button onClick={this.editClient} style={{border: 0, padding: 0}}> <i className='fab-custom edit fa fa-edit fa-3x' title='Editing client'></i></button>
                <a onClick={this.deleteClient}><i className='fab-custom remove fa fa-trash fa-3x' title='Delete client'></i></a>
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