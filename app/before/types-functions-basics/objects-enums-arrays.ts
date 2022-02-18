// const person: {
//     name: string;
//     age: number;
// } = {
//     name : 'Matthias',
//     age : 35,
// };

// const person: {
//     name: string,
//     age :number,
//     hobbies: string[],
//     role: [number, string]
// } = {
//     name : 'Matthias',
//     age : 35,
//     hobbies : ['Pen & Paper', 'Coding'],
//     role: [2, 'author']
// };

// person.role[1] = 10; // <- will fail


const person: {
    name: string,
    age :number,
    hobbies: string[],
    role: Role
} = {
    name : 'Matthias',
    age : 35,
    hobbies : ['Pen & Paper', 'Coding'],
    role: Role.AUTHOR
};

let favoriteActivities : any[];
favoriteActivities = ['Sports', 1];

console.log(person.role);

if (person.role === Role.ADMIN) {
    console.log('is admin');
}