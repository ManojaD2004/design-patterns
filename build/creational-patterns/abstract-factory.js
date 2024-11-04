"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class ProductA {
    prdName;
    // Table
    constructor(prdName) {
        this.prdName = prdName;
    }
}
class ProductB {
    prdName;
    // Chair
    constructor(prdName) {
        this.prdName = prdName;
    }
}
class AbsFactory {
    doSome() {
        const prdA = this.createProductA();
        const msgA = prdA.doSome();
        const prdB = this.createProductB();
        const msgB = prdB.doSome();
        console.log(msgA);
        console.log(msgB);
    }
}
class ConcretePrdA1 extends ProductA {
    typePrd = "A1";
    constructor() {
        super("Table with Black color");
    }
    doSome() {
        return `This is "${this.prdName}". Type: ${this.typePrd}`;
    }
}
class ConcretePrdB1 extends ProductB {
    typePrd = "B1";
    constructor() {
        super("Chair with Black color");
    }
    doSome() {
        return `This is "${this.prdName}". Type: ${this.typePrd}`;
    }
}
class ConcretePrdA2 extends ProductA {
    typePrd = "A2";
    constructor() {
        super("Table with Red color");
    }
    doSome() {
        return `This is "${this.prdName}". Type: ${this.typePrd}`;
    }
}
class ConcretePrdB2 extends ProductB {
    typePrd = "B2";
    constructor() {
        super("Chair with Red color");
    }
    doSome() {
        return `This is "${this.prdName}". Type: ${this.typePrd}`;
    }
}
class ConcreteFactory1 extends AbsFactory {
    createProductA() {
        return new ConcretePrdA1();
    }
    createProductB() {
        return new ConcretePrdB1();
    }
}
class ConcreteFactory2 extends AbsFactory {
    createProductA() {
        return new ConcretePrdA2();
    }
    createProductB() {
        return new ConcretePrdB2();
    }
    doSome() {
        const prdA = this.createProductA();
        const msgA = prdA.doSome();
        const prdB = this.createProductB();
        const msgB = prdB.doSome();
        console.log("Overrided:", chalk_1.default.blue(msgA));
        console.log("Overrided:", msgB);
    }
}
function clientLogic(factory) {
    factory.doSome();
}
function main() {
    console.log("Abstract Factory (Varients of group of Products):");
    console.log("Here are the details of the Products of Factory 1: ");
    clientLogic(new ConcreteFactory1());
    console.log("Here are the details of the Products of Factory 2: ");
    clientLogic(new ConcreteFactory2());
}
