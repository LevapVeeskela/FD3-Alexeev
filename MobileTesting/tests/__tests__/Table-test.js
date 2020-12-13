"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import Table from '../../src/components/table/Table';
import {
    Filters
} from '../../src/constants/enums';

test('Сheck data of table after clicks by buttons of filters', () => {
    const component = renderer.create(<Table/> );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    let tds = component.root.findAll(el => (el.type == 'td' && el.props.name == "balance"));
    const defaultValues = tds.map(el => el.children).flat().map(el => Number(el));
    
    // check work active filter
    const buttonActiveFilter = component.root.find(el => (el.type == 'input' && el.props.name == Filters.Active));
    buttonActiveFilter.props.onClick({
        target: {
            name: Filters.Active
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tds = component.root.findAll(el => (el.type == 'td' && el.props.name == "balance"));
    const activeValues = tds.map(el => el.children).flat().map(el => Number(el));
    expect(activeValues.every(el => el > 0)).toBeTruthy();

    // check work blocked filter
    const buttonBlocedFilter = component.root.find(el => (el.type == 'input' && el.props.name == Filters.Blocked));
    buttonBlocedFilter.props.onClick({
        target: {
            name: Filters.Blocked
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tds = component.root.findAll(el => (el.type == 'td' && el.props.name == "balance"));
    const blockedValues = tds.map(el => el.children).flat().map(el => Number(el));
    expect(blockedValues.every(el => el <= 0)).toBeTruthy();

    // check work all filter
    const buttonAllFilter = component.root.find(el => (el.type == 'input' && el.props.name == Filters.All));
    buttonAllFilter.props.onClick({
        target: {
            name: Filters.All
        },
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tds = component.root.findAll(el => (el.type == 'td' && el.props.name == "balance"));
    const allValues = tds.map(el => el.children).flat().map(el => Number(el));
    expect(allValues.length === defaultValues.length).toBeTruthy();
});
