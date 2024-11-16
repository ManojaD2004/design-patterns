"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
// My Product Data Structure
class Product1 {
    prdName;
    prdPrice;
    constructor(prdName, prdPrice) {
        this.prdName = prdName;
        this.prdPrice = prdPrice;
    }
}
// Friend Product Data Structure
class Product2 {
    prdName;
    details;
    constructor(prdName, details) {
        this.prdName = prdName;
        this.details = details;
    }
}
class ProductFactory {
    createProduct1(prdName, prdPrice) {
        const newPrd = {
            prdName: prdName,
            prdPrice: prdPrice,
        };
        return newPrd;
    }
    createProduct2(prdName, details) {
        const newPrd = {
            prdName: prdName,
            details: details,
        };
        return newPrd;
    }
}
class MyLogicCode {
    priceCheckService(prd1, prd2) {
        if (prd1.prdPrice === prd2.prdPrice) {
            console.log(chalk_1.default.red(`${prd1.prdName} and ${prd2.prdName} are the same price!`));
        }
        else if (prd1.prdPrice > prd2.prdPrice) {
            console.log(chalk_1.default.red(`${prd1.prdName} is Greater than ${prd2.prdName} in price!`));
        }
        else if (prd1.prdPrice < prd2.prdPrice) {
            console.log(chalk_1.default.red(`${prd1.prdName} is Lesser than ${prd2.prdName} in price!`));
        }
    }
}
// You can also make Adapter class like, which extends two classes
// This version is object like Adapter
// Also the Adapter can be two way. Like Product1 to Product2 and vice versa
// But creating two different classes give more focus and flexibility
class Product2Adapter extends Product1 {
    adaptee;
    constructor(adaptee) {
        super(adaptee.prdName, adaptee.details.prdPrices.default);
        this.adaptee = adaptee;
        // The adaptee can be used in any other methods you want!
    }
}
function clientLogic(serviceLogic, prd1, prd2) {
    serviceLogic.priceCheckService(prd1, prd2);
}
function main() {
    console.log(chalk_1.default.yellow("Adapter:"));
    //  Better example would be to use Adapter for JSON to XML/YAML, vice versa
    console.log(chalk_1.default.blue("Creating 2 different products with 2 different types..."));
    const prdFact = new ProductFactory();
    const prd1T1 = prdFact.createProduct1("IPhone X", 1000);
    const prd2T1 = prdFact.createProduct1("Dell Ultra", 2000);
    const prd1T2 = prdFact.createProduct2("IPhone X", {
        prdPrices: { default: 1000 },
    });
    const prd2T2 = prdFact.createProduct2("Dell Ultra", {
        prdPrices: { default: 2000 },
    });
    const prd1AT2 = new Product2Adapter(prd1T2);
    const prd2AT2 = new Product2Adapter(prd2T2);
    const serviceLogic = new MyLogicCode();
    clientLogic(serviceLogic, prd1T1, prd2T1);
    clientLogic(serviceLogic, prd1T1, prd2AT2);
    clientLogic(serviceLogic, prd1AT2, prd2T1);
    clientLogic(serviceLogic, prd1AT2, prd2AT2);
    console.log(chalk_1.default.blue("Adapter makes two different types/data/code to be compatible"));
}
