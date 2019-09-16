import { CustomValidators } from "../util/customValidators";

const customValidators = new CustomValidators() 

describe('Sample Test', () => {
    it('should test that true === true', () => {
        const result = customValidators.suma(3 , 4);
        expect(result).toBe(7)
    })
})