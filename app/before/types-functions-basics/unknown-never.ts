let userInput: unknown; // better take unknown over any to tell we will have to make extra checks for it
let userName: string;
userInput = 5;
userInput = 'Max';

if (typeof userInput === 'string') {
    userName = userInput;
}

// never will not be added by default you will have to add it otherwise void will be taken which has undefined as possiblie return
// where never will really return nothing
function generateError(message :string, code : number): never {
    throw {message: message, errorCode : code};
}

const result = generateError('An error occurred', 500);
console.log(result);