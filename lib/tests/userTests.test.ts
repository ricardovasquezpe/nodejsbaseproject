import { CustomValidators } from "../util/customValidators";

const customValidators = new CustomValidators() 

describe('Sample Test11222', () => {
    it('should test that true === true 111', () => {
        const result = customValidators.suma(5 , 4);
        expect(result).toBe(7)
    })
})  