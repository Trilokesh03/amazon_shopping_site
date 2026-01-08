import { formatCurrency } from "../scriptfiles/utils/convertmoney.js";

describe('test suite :formatCurrency',()=>{
    it('convert cent to dollar',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('wokr with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });
    it('rounding off',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
    it('rounding off',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.00');
    });
});