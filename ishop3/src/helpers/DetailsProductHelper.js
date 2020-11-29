import { ready } from 'jquery';
import { DetailsTypes } from '../constants/enums';

export const TextModeInfo = function (mode, product) {
    const name = product && product.name ? product.name : '';
    switch (mode) {
        case DetailsTypes.Edit:
            return `Edit product ${name}`;
        case DetailsTypes.Create:
            return `Add new product`;;
        default:
            return `Details product  ${name}`;
    }
}

export const CastToNeedType = function(value, name) {
    switch(name){
        case 'price':
            return Number(value);
        case 'count': 
            return Number(value);
        case 'colors':
            return value.split('\n')
        default: 
            return value;
    }
}