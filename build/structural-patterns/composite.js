"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class File {
    compName;
    data;
    constructor(compName, data = "") {
        this.compName = compName;
        this.data = data;
    }
    getData() {
        return this.data;
    }
    setData(data, index = 0) {
        if (typeof data === "string") {
            this.data = data;
        }
        else {
            this.data = data[index % data.length];
        }
    }
    doubleClick() {
        return `${this.compName} ( data: ${this.data} )`;
    }
}
class Folder {
    compName;
    children;
    constructor(compName, children = []) {
        this.compName = compName;
        this.children = children;
    }
    addNode(node) {
        const isExists = this.children.findIndex((value) => node.compName === value.compName);
        if (isExists > -1) {
            console.log(chalk_1.default.blue("File/Folder already exist in this Location!"));
            return false;
        }
        this.children.push(node);
        return true;
    }
    removeNode(node) {
        this.children = this.children.filter((value) => node.compName !== value.compName);
    }
    getChildren() {
        return this.children;
    }
    doubleClick() {
        const treeView = [];
        for (let i = 0; i < this.children.length; i++) {
            const element = this.children[i];
            treeView.push(element.doubleClick());
        }
        return `${this.compName}( ${treeView.join(" + \n")} )`;
    }
    setData(data, index = 0) {
        for (let i = 0; i < this.children.length; i++) {
            const element = this.children[i];
            element.setData(data, index + 1);
        }
    }
}
// function isFolder(node: Component): node is Folder {
//   if ((node as Folder).addNode !== undefined) {
//     return true;
//   } else {
//     return false;
//   }
// }
// function isFile(node: Component): node is File {
//   if ((node as File).getData !== undefined) {
//     return true;
//   } else {
//     return false;
//   }
// }
function clientLogic() {
    console.log(chalk_1.default.red("Creating new File and Folders"));
    const folder1 = new Folder("folder1");
    const folder2 = new Folder("folder2");
    const folder3 = new Folder("folder3");
    const file1 = new File("file1", "Hello Tiger!");
    const file2 = new File("file2", "Hello Lion!");
    const file3 = new File("file3", "Hello Bird!");
    const file4 = new File("file4", "Hello Dolphin!");
    folder1.addNode(folder2);
    folder1.addNode(folder3);
    folder1.addNode(file1);
    folder2.addNode(file2);
    folder2.addNode(file3);
    folder3.addNode(file4);
    // The work is divided equally to all the nodes and can be worked independently of the nodes too!
    // You can work either as group like directory moving, or indiviual work dividing like
    // calculating huge operations (or dividing work among processes) or moving components
    // all together in a group!
    console.log(chalk_1.default.blue("Folder 1 Tree View: "));
    console.log(chalk_1.default.cyanBright(folder1.doubleClick()));
    console.log(chalk_1.default.blue("Folder 2 Tree View: "));
    console.log(chalk_1.default.cyanBright(folder2.doubleClick()));
    console.log(chalk_1.default.blue("Folder 3 Tree View: "));
    console.log(chalk_1.default.cyanBright(folder3.doubleClick()));
}
function main() {
    console.log(chalk_1.default.yellow("Composite:"));
    clientLogic();
}
