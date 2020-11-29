import { DetailsTypes } from '../constants/enums';

export const TextModeInfo = function (mode, product) {
    switch (mode) {
        case DetailsTypes.Edit:
            return `Edit product ${product.name}`;
        case DetailsTypes.Create:
            return `Add new product`;;
        default:
            return `Details ${product.name}`;
    }
}