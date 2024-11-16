"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const catalogType = "structural";
const dpType = "proxy";
// You can make either paramaterised way or function way for any operations.
async function main() {
    try {
        const module = await Promise.resolve(`${`./${catalogType}-patterns/${dpType}`}`).then(s => __importStar(require(s)));
        module.main();
    }
    catch (error) {
        console.error(error); // Write to stderr, log writes to stdout
    }
}
main();
// Usually the need for patterns arises when people choose a programming language or a
// technology that lacks the necessary level of abstraction. In this case, patterns become
// a kludge that gives the language much-needed super-abilities. - refactoring.guru
//
// "If all you have is a hammer, everything looks like a nail."
// This is the problem that haunts many novices who have just familiarized themselves
// with patterns. Having learned about patterns, they try to apply them everywhere, even
// in situations where simpler code would do just fine. - refactoring.guru
