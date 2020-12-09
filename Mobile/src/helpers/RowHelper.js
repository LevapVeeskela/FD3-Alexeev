export const SelectTextStatus =(balance) => {
    if(balance > 0) return 'active';
    return 'blocked';
}
export const SelectClassStatus =(balance) => {
    if(balance > 0) return 'box-active';
    return 'box-blocked';
}
