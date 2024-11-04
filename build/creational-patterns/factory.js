"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class Product {
    prdName;
    prdPrice;
    constructor(prdName, prdPrice) {
        this.prdName = prdName;
        this.prdPrice = prdPrice;
    }
    getValues() {
        return { prdName: this.prdName, prdPrice: this.prdPrice };
    }
}
class ConcreteProductA extends Product {
    typePrd = "A";
    constructor(prdName, prdPrice) {
        super(prdName, prdPrice);
    }
    doSome() {
        return `
    ${this.prdName} is the product name and it is type "${this.typePrd}". 
    Price Is: ${this.prdPrice}`
            .replace(/\s{2,}/g, " ")
            .trim();
    }
}
class ConcreteProductB extends Product {
    typePrd = "B";
    constructor(prdName, prdPrice) {
        super(prdName, prdPrice);
    }
    doSome() {
        return `
    ${this.prdName} is the product name and it is type "${this.typePrd}". 
    Price Is: ${this.prdPrice}`
            .replace(/\s{2,}/g, " ")
            .trim();
    }
}
class Creator {
    someOtherFunc() {
        console.log("Independent Working!");
        const tempPrd = this.createPrd();
        const msg = tempPrd.doSome();
        console.log(msg);
    }
}
class ConcreteCreatorA extends Creator {
    createPrd() {
        return new ConcreteProductA("Apple", 100);
    }
}
class ConcreteCreatorB extends Creator {
    createPrd() {
        return new ConcreteProductB("Carrot", 200);
    }
    someOtherFunc() {
        // you can override and change the business logic
        console.log("Independent Working Override!");
        const tempPrd = this.createPrd();
        const prdValues = tempPrd.getValues();
        const msg = `Product name is: ${prdValues.prdName}. And price is: $ ${prdValues.prdPrice}, Rs ${prdValues.prdPrice * 82.76}
    `;
        console.log("Overrided:", msg);
    }
}
function clientLogic(clientFactory) {
    clientFactory.someOtherFunc();
}
function main() {
    console.log(chalk_1.default.red("Factory:\n"));
    clientLogic(new ConcreteCreatorA());
    clientLogic(new ConcreteCreatorB());
}
