const button = document.querySelector('button');

function clickHandler(message: string) {
    console.log('Clicked! ' + message);
}
//
// let userN = 'MAx';
//
// function addNPlusN(n1: number, n2:number) {
//     if (n1+ n2  >0) {
//         return n1 + n2;
//     }
// }
//
//
// if (button) {
//     button.addEventListener('click', clickHandler.bind(null,'test'));
// }
//
//
// const addShort = (a: number, b: number = 1.1) => a +b;
//
// const printOutput: (a: number |string) => void = output => console.log(output);
//
// printOutput(addShort(5));

const buttonX = document.querySelector('button');

if (buttonX) {
    buttonX.addEventListener('click', event => console.log(event));
}

const hobbies = ['sports', 'cooking', 'testing', 'drinking'];
const activeHobbies = ['Coding'];

activeHobbies.push(...hobbies);

console.log(activeHobbies);

const personMe = {
    name : 'me',
    age: 35,
    gender : 'male'
}

const copiedMe = { ...personMe};

const addNPlusN = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};

const addedNumbers = addNPlusN(5,10,2,7);
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobby1);
console.log(hobby2);
console.log(remainingHobbies);
console.log(hobbies);

const {name : uName, age} = person;

console.log(uName, age);