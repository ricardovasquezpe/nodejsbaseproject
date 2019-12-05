import { CustomValidators } from "../util/customValidators";

const customValidators = new CustomValidators() 

describe('Sample Test', () => {
    it('should test that true === true22222', () => {
        const result = customValidators.suma(5 , 4);
        expect(result).toBe(7)
    })
})  