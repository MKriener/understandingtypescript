function addNumbers(n1:number, n2 :number) {
    return n1 + n2;
}

function printResult(num: number) {
    console.log('Result: ' + num);
}
// cb = callback function which expects a number and can return something but the return will not be used
function addAndHandle(n1 :number, n2: number, cb: (num :number) => void) {
    const result = n1 +n2;
    cb(result);
}


printResult(addNumbers(5, 6.8));

// tells we except every function with 2 parameters are number and returns number
let combineValues:(a: number, b:number) => number;

combineValues = addNumbers;
// combineValues = printResult;// will fail/ is not allowed

console.log(combineValues(5, 6.8));

const res = addAndHandle(5, 68, (result) => {
    console.log(result);
    return result;
});