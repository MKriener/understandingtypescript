import {IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
    @IsNotEmpty()
    private readonly title

    @IsNumber()
    @IsPositive()
    private readonly price: number

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    getInformation() {
        return [this.title, `$${this.price}`]
    }
}