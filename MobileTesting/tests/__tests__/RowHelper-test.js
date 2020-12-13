import {SelectTextStatus, SelectClassStatus} from '../../src/helpers/RowHelper';

test('check SelectTextStatus and SelectTextStatus', () => {
    const zeroBalance = 0;
    const minusBalance = -200;
    const plusBalance = 200;
    expect(SelectTextStatus(zeroBalance)).toBe('blocked');
    expect(SelectTextStatus(minusBalance)).toBe('blocked');
    expect(SelectTextStatus(plusBalance)).toBe('active');
  
    expect(SelectClassStatus(zeroBalance)).toBe('box-blocked');
    expect(SelectClassStatus(minusBalance)).toBe('box-blocked');
    expect(SelectClassStatus(plusBalance)).toBe('box-active');
})