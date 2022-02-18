type Admin = {
    name: string;
    privileges : string [];
}

type Employee = {
    name : string;
    startDate : Date;
}

// interface ElevatedEmployee implements Admin, Employee {}
// both will result in same
type ElevatedEmployee = Admin & Employee;

const e1 : ElevatedEmployee = {
    name: 'max',
    startDate: new Date(),
    privileges: ['enter'],
}

type Combinables = string | number;
type Numeric = number | boolean;

// intersection type
type Universal = Combinables & Numeric;

// function overload only overloads are possible use 'test' and 1 will be forbidden
function addSomething(a: string, b: string): string
function addSomething(a: number, b: string): string
function addSomething(a: Combinables, b: Combinables) {
    //type guard
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}


const resultString = addSomething(1, 'K');
resultString.split(' ');

const fetchedUserData = {
    id: 'a',
    name: 'Joe',
    job: {title: 'CEO', description: 'My own company'}
}

// checks if job exist on object and then if title exist
console.log(fetchedUserData.job && fetchedUserData.job.title);
//short way => named optional chaining
console.log(fetchedUserData?.job?.title);


const myUserInput = null;
// will also except  null, false, ''
const storedData = myUserInput ||'DEFAULT';

// nullish  coalescing
const storedDataOnlyOnNull = myUserInput ?? 'DEFAULT';


type UnknownEmployee = Employee | Admin;

function printEmployee(emp : UnknownEmployee) {
    console.log('Name: ' + emp.name);
    //if (typeof emp === 'Admin') {
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }

    if ('startDate' in emp) {
        console.log('StartDate: ' + emp.startDate);
    }
}

printEmployee({name: 'boy', privileges: ['enter']});
printEmployee({name: 'boy', startDate: new Date('2020-01-01')});


class Car {
    drive() {
        console.log('Driving');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck');
    }

    loadCargo(amount: number) {
        console.log('Load '+ amount);
    }
}

type Vehicle = Car | Truck;

function useVehicle(vehicle : Vehicle) {
    vehicle.drive();
    //if ('loadCargo' in vehicle) {
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(100);
    }
}

const v1 = new Car();
const v2 = new Truck();

useVehicle(v1);
useVehicle(v2);


//discriminated unions
interface Bird {
    typeOfAnimal: 'bird'; //will be autocompleted in switch case
    flyingSpeed: number;
}

interface Horse {
    typeOfAnimal: 'horse'; //will be autocompleted in switch case
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.typeOfAnimal) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving speed of: '+ animal.typeOfAnimal + speed);
}


moveAnimal({typeOfAnimal: "bird", flyingSpeed: 10});

const paragraphQuery = document.querySelector('p');
const paragraphId = document.getElementById('message-output');

//default TS way
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
userInputElement.value = 'Hi there !';

//react way
const userInputElementAgain = <HTMLInputElement>document.getElementById('user-input')! as HTMLInputElement;
userInputElementAgain.value = 'Hi there with as';

//or without exclamation mark //don't tell it will never be null
const theUserInputElement = document.getElementById('user-input');

if (theUserInputElement) {
    (theUserInputElement as HTMLInputElement).value = 'Hi there because your never null!';
}

interface ErrorContainer { // {email: 'Not a valid email, username: 'Must start with a character' }
    [prop: string] : string;
}

const errorBag1 : ErrorContainer= {
    email: 'Not a valid email',
    username : 'Must start with a character'
}

const errorBag2: ErrorContainer = {
    1: 'has to be number',
    email: 'invalid mail',
}

const errorBag3: ErrorContainer = {
    username: 'invalid'
}
