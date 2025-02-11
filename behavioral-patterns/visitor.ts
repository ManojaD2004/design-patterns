import chalk from "chalk";

interface Visitor {
  visitA(e: ElementA): void;
  visitB(e: ElementB): void;
}

interface Element {
  accept(v: Visitor): void;
  member: string;
}

class ElementA implements Element {
  member: string = "Students";
  featureA() {
    console.log(chalk.cyan(`You are in School A`));
  }
  accept(v: Visitor) {
    v.visitA(this);
  }
}

class ElementB implements Element {
  member: string = "Common citizen";
  featureB() {
    console.log(chalk.cyan(`You are in House B`));
  }
  accept(v: Visitor) {
    v.visitB(this);
  }
}

class VisitorA implements Visitor {
  visitA(e: ElementA): void {
    console.log(chalk.cyanBright(`I sell student loan for ${e.member}!`));
    e.featureA();
  }
  visitB(e: ElementB): void {
    console.log(chalk.cyanBright(`I sell home loan for ${e.member}!`));
    e.featureB();
  }
}

class VisitorB implements Visitor {
  visitA(e: ElementA): void {
    console.log(chalk.cyanBright(`I sell processed food for ${e.member}!`));
    e.featureA();
  }
  visitB(e: ElementB): void {
    console.log(chalk.cyanBright(`I sell healthy food for ${e.member}!`));
    e.featureB();
  }
}

function clientLogic() {
  const va = new VisitorA();
  const vb = new VisitorB();
  const eleA: Element = new ElementA();
  const eleB: Element = new ElementB();
  console.log(chalk.red(`Visitor A sells loans:`));
  eleA.accept(va);
  eleB.accept(va);
  console.log(chalk.red(`Visitor B sells lunch:`));
  eleA.accept(vb);
  eleB.accept(vb);
}

function main() {
  console.log(chalk.yellow("Visitor:"));
  clientLogic();
}

export { main };
