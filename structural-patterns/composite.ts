import chalk from "chalk";

interface Component {
  compName: string;
  doubleClick(): string;
  setData(data: string | string[], index?: number): void;
}

class File implements Component {
  constructor(public compName: string, private data: string = "") {}
  getData() {
    return this.data;
  }
  setData(data: string | string[], index: number = 0) {
    if (typeof data === "string") {
      this.data = data;
    } else {
      this.data = data[index % data.length];
    }
  }
  doubleClick(): string {
    return `${this.compName} ( data: ${this.data} )`;
  }
}

class Folder implements Component {
  constructor(public compName: string, private children: Component[] = []) {}
  addNode(node: Component) {
    const isExists = this.children.findIndex(
      (value) => node.compName === value.compName
    );
    if (isExists > -1) {
      console.log(chalk.blue("File/Folder already exist in this Location!"));
      return false;
    }
    this.children.push(node);
    return true;
  }
  removeNode(node: Component) {
    this.children = this.children.filter(
      (value) => node.compName !== value.compName
    );
  }
  getChildren(): Component[] {
    return this.children;
  }
  doubleClick(): string {
    const treeView: string[] = [];
    for (let i = 0; i < this.children.length; i++) {
      const element = this.children[i];
      treeView.push(element.doubleClick());
    }
    return `${this.compName}( ${treeView.join(" + \n")} )`;
  }
  setData(data: string[], index: number = 0): void {
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
  console.log(chalk.red("Creating new File and Folders"));
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
  console.log(chalk.blue("Folder 1 Tree View: "));
  console.log(chalk.cyanBright(folder1.doubleClick()));
  console.log(chalk.blue("Folder 2 Tree View: "));
  console.log(chalk.cyanBright(folder2.doubleClick()));
  console.log(chalk.blue("Folder 3 Tree View: "));
  console.log(chalk.cyanBright(folder3.doubleClick()));
}

function main() {
  console.log(chalk.yellow("Composite:"));
  clientLogic();
}

export { main };
