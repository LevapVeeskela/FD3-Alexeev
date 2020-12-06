export const SelectTextStatus =(isActive) => {
    if(isActive) return 'active';
    return 'blocked';
}
export const SelectClassStatus =(isActive) => {
    if(isActive) return 'box-active';
    return 'box-blocked';
}
