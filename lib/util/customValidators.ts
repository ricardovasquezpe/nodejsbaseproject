export class CustomValidators { 

    public isValidDate(value): boolean {
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
        const date = new Date(value);
        if (!date.getTime()) return false;
        return date.toISOString().slice(0, 10) === value;
    }

    public suma(a, b){
        return a + b;
    }

}