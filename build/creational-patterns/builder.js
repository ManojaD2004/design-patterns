"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class Product1 {
    prdName;
    prdPrice;
    features;
    constructor(prdName = "Apple Phone", prdPrice = 1000, features = []) {
        this.prdName = prdName;
        this.prdPrice = prdPrice;
        this.features = features;
    }
}
class Product2 {
    prdName;
    prdPrice;
    features;
    constructor(prdName = "Dell Laptop", prdPrice = 700, features = []) {
        this.prdName = prdName;
        this.prdPrice = prdPrice;
        this.features = features;
    }
}
class ConcreteBuilder1 {
    resPrd;
    constructor() {
        this.resPrd = new Product1();
    }
    reset() {
        this.resPrd = new Product1();
    }
    buildStepA() {
        this.resPrd.prdName += " 16";
        this.resPrd.features.push("ChatGPT with Siri");
    }
    buildStepB() {
        this.resPrd.prdName += " Pro";
        this.resPrd.prdPrice += 100;
        this.resPrd.features.push("Camera with Sticekrs");
    }
    buildStepC() {
        this.resPrd.prdName += " Max";
        this.resPrd.prdPrice += 200;
        this.resPrd.features.push("Ultra FPS for Games");
    }
    getResult() {
        const res = this.resPrd;
        this.reset();
        return res;
    }
}
class ConcreteBuilder2 {
    resPrd;
    constructor() {
        this.resPrd = new Product2();
    }
    reset() {
        this.resPrd = new Product2();
    }
    buildStepA() {
        this.resPrd.prdName += " Mega";
        this.resPrd.features.push("Microsoft Copilot");
    }
    buildStepB() {
        this.resPrd.prdName += " Pro";
        this.resPrd.prdPrice += 150;
        this.resPrd.features.push("More Ram Added");
    }
    buildStepC() {
        this.resPrd.prdName += " Max";
        this.resPrd.prdPrice += 200;
        this.resPrd.features.push("Ultra HD Graphics for Video Streaming");
    }
    getResult() {
        const res = this.resPrd;
        this.reset();
        return res;
    }
}
class Director {
    builder;
    constructor(builder) {
        this.builder = builder;
    }
    changeBuilder(builder) {
        this.builder = builder;
    }
    makePrd(type) {
        if (type === "simple") {
            // Same
        }
        else if (type === "pro") {
            this.builder.buildStepA();
        }
        else if (type === "ultra") {
            this.builder.buildStepA();
            this.builder.buildStepB();
        }
        else if (type === "advance") {
            this.builder.buildStepA();
            this.builder.buildStepB();
            this.builder.buildStepC();
        }
        else {
            console.log(chalk_1.default.bold("Invalid type statement..."));
        }
    }
}
function logFun(tempPrd) {
    console.log(chalk_1.default.magenta(`Product Name: ${tempPrd.prdName}`));
    console.log(chalk_1.default.red(`Price: ${tempPrd.prdPrice}`));
    console.log(chalk_1.default.cyan(`Features: ${tempPrd.features}\n`));
}
function clientLogic(builder1, builder2) {
    const director = new Director(builder1);
    director.makePrd("ultra");
    logFun(director.builder.getResult());
    director.makePrd("pro");
    logFun(director.builder.getResult());
    director.changeBuilder(builder2);
    director.makePrd("advance");
    logFun(director.builder.getResult());
    director.builder.buildStepA();
    director.builder.buildStepC();
    logFun(director.builder.getResult());
}
function main() {
    console.log(chalk_1.default.yellow("Builder:"));
    clientLogic(new ConcreteBuilder1(), new ConcreteBuilder2());
}
