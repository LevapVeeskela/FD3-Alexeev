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