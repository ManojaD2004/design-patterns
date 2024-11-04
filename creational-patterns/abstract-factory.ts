import chalk from "chalk";

abstract class ProductA {
  // Table
  constructor(public prdName: string) {}
  abstract doSome(): string;
}

abstract class ProductB {
  // Chair
  constructor(public prdName: string) {}
  abstract doSome(): string;
  abstract collabWithOtherPrd(otherPrd: ProductA): string;
}

abstract class AbsFactory {
  abstract createProductA(): ProductA;
  abstract createProductB(): ProductB;
}

class ConcretePrdA1 extends ProductA {
  private typePrd = "A1";
  constructor() {
    super("Table with Black color");
  }
  doSome(): string {
    return `This is "${this.prdName}". Type: ${this.typePrd}`;
  }
}

class ConcretePrdA2 extends ProductA {
  private typePrd = "A2";
  constructor() {
    super("Table with Red color");
  }
  doSome(): string {
    return `This is "${this.prdName}". Type: ${this.typePrd}`;
  }
}

class ConcretePrdB1 extends ProductB {
  private typePrd = "B1";
  constructor() {
    super("Chair with Black color");
  }
  doSome(): string {
    return `This is "${this.prdName}". Type: ${this.typePrd}`;
  }
  //   Should only work with that varient. Meaning ProductA1
  collabWithOtherPrd(otherPrd: ProductA): string {
    return `${otherPrd.prdName} and ${this.prdName} is cool. Type: ${this.typePrd}`;
  }
}

class ConcretePrdB2 extends ProductB {
  private typePrd = "B2";
  constructor() {
    super("Chair with Red color");
  }
  doSome(): string {
    return `This is "${this.prdName}". Type: ${this.typePrd}`;
  }
  //   Should only work with that varient. Meaning ProductA2
  collabWithOtherPrd(otherPrd: ProductA): string {
    return `${otherPrd.prdName}, and ${this.prdName} is cool. Type: ${this.typePrd}`;
  }
}

class ConcreteFactory1 extends AbsFactory {
  createProductA(): ProductA {
    return new ConcretePrdA1();
  }
  createProductB(): ProductB {
    return new ConcretePrdB1();
  }
}

class ConcreteFactory2 extends AbsFactory {
  createProductA(): ProductA {
    return new ConcretePrdA2();
  }
  createProductB(): ProductB {
    return new ConcretePrdB2();
  }
}

function clientLogic(factory: AbsFactory) {
  const prdA = factory.createProductA();
  const prdB = factory.createProductB();
  const msgA = prdA.doSome();
  const msgB = prdB.collabWithOtherPrd(prdA);
  console.log(chalk.bold(msgA));
  console.log(chalk.magenta(msgB));
}

function main() {
  console.log(
    chalk.yellow("Abstract Factory (Varients of group of Products):")
  );
  console.log("Here are the details of the Products of Factory 1: ");
  clientLogic(new ConcreteFactory1());
  console.log("Here are the details of the Products of Factory 2: ");
  clientLogic(new ConcreteFactory2());
}

export { main };
