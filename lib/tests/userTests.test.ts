import { CustomValidators } from "../util/customValidators";

const customValidators = new CustomValidators() 

describe('Sample Test11222', () => {
    it('This test should be true!', () => {
        const result = customValidators.suma(3 , 4);
        expect(result).toBe(7)
    })
})  