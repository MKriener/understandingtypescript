import 'reflect-metadata';
import { plainToInstance } from "class-transformer";

import _ from 'lodash';
import { Product } from './product.model';
import {validate} from "class-validator";

declare let GLOBAL: string;

console.log(_.shuffle([1,2,3]));

console.log(GLOBAL);
const products = [
    {title: 'A Carpet', price: 29.99},
    {title: 'A Book', price: 19.99}
];

const newProd = new Product('', -5.99);
validate(newProd).then(errors => {
    if (errors.length > 0) {
        console.log('Errors');
        console.log(errors);
    } else {
        console.log(newProd.getInformation());
    }
});


// const loadedProducts = products.map(prod => {
//     return new Product(prod.title, prod.price);
// })

const loadedProducts = plainToInstance(Product, products);

loadedProducts.forEach(prod => {
    console.log(prod.getInformation());
});