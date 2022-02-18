// type AddFn = (a :number, b :number) => number;

interface AddFn {
    (a :number, b :number): number;
}

let addFct : AddFn;

addFct =(n1 : number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name: string;
    outputName?: string; //optional
}

interface Greetable extends Named {
    greet(phrase :string): void;
}

class Person implements Greetable {
    outputName?: string
    constructor(readonly name: string, public age :number) {
    }

    setOutputName(outPutName: string) {
        this.outputName = outPutName;
    }

    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    }

    getOutputName() {
        if (this.outputName) {
            throw Error('No outputName defined');
        }

        return this.outputName;
    }
}

let user1: Greetable;

// will fail cause if you use interface as type hint object has to match exactly so age will be to much
// user1 = {
//     name : 'Scott',
//     age: 22,
//     greet(phrase: string) {
//         console.log(this.name + ' greet ' + name);
//     }
// };

const user2 = new Person('Scott', 22);

user2.greet('Hi');

