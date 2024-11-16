"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
function clientLogic() {
}
function main() {
    console.log(chalk_1.default.yellow("Proxy:"));
    clientLogic();
}
