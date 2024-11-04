"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class ConcreteProduct {
    prdName;
    prdFeatures;
    prdPrice;
    constructor(prdName, prdFeatures, prdPrice) {
        this.prdName = prdName;
        this.prdFeatures = prdFeatures;
        this.prdPrice = prdPrice;
    }
}
class Singleton {
    static instance;
    constructor() {
        if (!Singleton.instance) {
            console.log(chalk_1.default.bgYellow.red.bold(" Only Once "));
            Singleton.instance = new ConcreteProduct("IPhone", ["Good Camera", "High FPS", "Split View Apps"], 1000);
        }
    }
    getInstance() {
        return Singleton.instance;
    }
}
function clientLogic(n) {
    console.log(chalk_1.default.magenta(`Creating Singleton Object ${n} times:`));
    for (let i = 0; i < n; i++) {
        console.log(chalk_1.default.blue(`Creating Singleton Object ${i + 1} time:`));
        const newSingletion = new Singleton();
        const product = newSingletion.getInstance();
        console.log(product);
    }
    console.log(chalk_1.default.red(`But only one time the "Product Object" was created!`));
}
function main() {
    console.log(chalk_1.default.yellow("Singleton:"));
    const n = 5;
    clientLogic(n);
}
