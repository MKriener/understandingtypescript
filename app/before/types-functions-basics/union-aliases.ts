type Combinable = string|number; // alias
type ConversionDescriptor = 'as-number' | 'as-text'; //alias //<--literal Types

function combine(
    n1: Combinable,
    n2: Combinable,
    resultConversion: ConversionDescriptor
) {
    // if (typeof n1 === typeof n2) { // not allowed by TypeScript
    //     return n1 + n2;
    // }
    // if ((typeof n1 === 'number' && typeof n2 === 'number') || (typeof n1 === 'string' && typeof n2 === 'string')) { // not allowed by TypeScript
    //     return n1 + n2;
    // }

    let result;
    if (typeof n1 === 'number' && typeof n2 === 'number' || resultConversion === 'as-number') {
        result = +n1 + +n2;
    }

    if (typeof n1 === 'string' && typeof n2 === 'string') {
        result = n1 + n2;
    }

    console.log(result);

    // if (resultConversion === 'as-number') {
    //     return +result; // or parseFloat(result)
    // } else {
    //     return result.toString();
    // }

    throw new TypeError(typeof n1 + ' and ' + typeof n2 + ' are not equal');
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);

console.log(combine(1, 'Anna', 'as-text'));

console.log(combine(1, 'Anna', 'as-number'));