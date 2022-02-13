//const noTypes : Array = []; // not allowed
const noTypes : any[] = [];
const names: Array<string> = [];
// names[0].split(' ');
const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 500);
});

promise.then(data => {
    data.split(' ');
})

const promiseN = new Promise<number>((resolve) => {
    setTimeout(() => {
        resolve(666);
    }, 500);
});

promiseN.then(data => {
    return data - 100;
})


//Generics
// template T and U will allow to use properties of the objects
// extends object is a constraint it is not needed but will specifiy the type more string, number etc. also possibile
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

console.log(merge({name: 'Bob'}, {age : 22}));

const mergeObj = merge({name: 'Bob', hobbies:['drive']}, {age : 22});
console.log(mergeObj.age);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value';
    if (element.length  === 1) {
        descriptionText = 'Got length 1';
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements';
    }

    return [element, descriptionText];
}

console.log(countAndDescribe(['a', 'b']));
console.log(countAndDescribe('test'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name: 'Alice'}, 'name'));

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('text');
//textStorage.addItem(1); // will fail

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);

const numberStringStorage = new DataStorage<number | string>();
numberStringStorage.addItem(1);
numberStringStorage.addItem('text');

// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: 'Bob'});
// objStorage.addItem({name: 'Alice'});
// console.log(objStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}

const readonlyNames: Readonly<string[]> = ['Bob', 'Alice'];// no push or pop is allowed now