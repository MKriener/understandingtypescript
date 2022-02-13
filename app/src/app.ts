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

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptior: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        },
    };
    return adjDescriptior;
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