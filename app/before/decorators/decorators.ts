function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

//will be executed on instantiation
function WithTemplate(template: string, hookId :string) {
    return function<T extends {new(...args: any[]): {name: string} }> (originalConstructor: T) {
        console.log('Rendering template');
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();

                const hookElt = document.getElementById(hookId);
                if (hookElt) {
                    hookElt.innerHTML = template;
                    hookElt.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

@Logger('LOGGING - PERSONONE')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class PersonOne {
    name = 'Bob';

    constructor() {
        console.log('Creating person object');
    }
}

const pers = new PersonOne();

console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);

}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if(val > 0) {
            this._price = val;
            return;
        }

        throw  Error('price hast obe graeter than 0');
    }

    get price() {
        return this._price;
    }

    constructor(t: string, p : number) {
        this.title = t;
        this._price = p ;
    }

    @Log3
    getPriceWithTax(@Log4 tax : number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

function Autobind(_: any, _2: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;
    const adjDescriptor: TypedPropertyDescriptor<any> = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        },
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button1 = document.querySelector('button')!;
button1.addEventListener('click', p.showMessage);

// -----

interface ValidationConfig {
    [property: string] : {
        [validatableProp: string]: string [] //['required, 'positive']
    }
}

const registeredValidators: ValidationConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    return !!obj[prop] && obj[prop] !== '';
                case 'positive':
                    return obj[prop] > 0;
            }
        }
    }
    return true;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener(
    'submit', event => {
        event.preventDefault();
        const titleElt = document.getElementById('title') as HTMLInputElement;
        const priceElt = document.getElementById('price') as HTMLInputElement;

        const title = titleElt.value;
        const price = +priceElt.value;

        const createdCourse = new Course(title, price);

        if (!validate(createdCourse) ) {
            alert('invalid input, please try again');
            return;
        }
        console.log(createdCourse);
    }
)
