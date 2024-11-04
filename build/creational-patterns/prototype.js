"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class ConcretePrototype {
    data;
    constructor(x) {
        if (typeof x === "string") {
            this.data = x;
        }
        else {
            this.data = x.data;
        }
    }
    clone() {
        return new ConcretePrototype(this);
    }
}
class SubConcretePrototype extends ConcretePrototype {
    data2;
    dateData;
    comp;
    constructor(x) {
        if (typeof x === "string") {
            super(x + " " + x);
            this.data2 = x;
        }
        else {
            super(x);
            this.data2 = x.data2;
        }
        this.dateData = new Date("2024-11-05");
        this.comp = new ComponentWithBackReference(this);
    }
    clone() {
        return new SubConcretePrototype(this);
    }
}
class ComponentWithBackReference {
    prototype;
    constructor(prototype) {
        this.prototype = prototype;
    }
}
function clientLogic(prototype) {
    const newClone = prototype.clone();
    return newClone;
}
function main() {
    console.log(chalk_1.default.yellow("Prototype:"));
    const newObj = new ConcretePrototype("Hello Tiger!");
    console.log(chalk_1.default.magenta("New Object Create!"));
    const newCloneObj = clientLogic(newObj);
    console.log(chalk_1.default.magenta("New Clone Object Create!"));
    if (newObj.data === newCloneObj.data) {
        console.log(chalk_1.default.blue("The objects have cloned Primitive Values!"));
        console.log(newObj);
        console.log(newCloneObj);
    }
    else {
        console.log(chalk_1.default.blue("The objects have not cloned Primitive Values!"));
        console.log(newObj);
        console.log(newCloneObj);
    }
    const newSubObj = new SubConcretePrototype("Hello Tiger!");
    console.log(chalk_1.default.magenta("New Sub Object Create!"));
    const newSubCloneObj = clientLogic(newSubObj);
    console.log(chalk_1.default.magenta("New Clone Sub Object Create!"));
    if (newSubObj.comp === newSubCloneObj.comp ||
        newSubObj.dateData === newSubCloneObj.dateData) {
        console.log(chalk_1.default.blue("The Sub objects are not Clone (has same references)!"));
        console.log(newSubObj);
        console.log(newSubCloneObj);
    }
    else {
        console.log(chalk_1.default.blue("The Sub objects are Clone (has different references)!"));
        console.log(newSubObj);
        console.log(newSubCloneObj);
    }
}
