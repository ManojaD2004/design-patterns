import chalk from "chalk";

interface Builder {
  reset(): void;
  buildStepA(): void;
  buildStepB(): void;
  buildStepC(): void;
  getResult(): Product;
}

interface Product {
  prdName: string;
  prdPrice: number;
  features: string[];
}

class Product1 implements Product {
  constructor(
    public prdName: string = "Apple Phone",
    public prdPrice: number = 1000,
    public features: string[] = []
  ) {}
}

class Product2 implements Product {
  constructor(
    public prdName: string = "Dell Laptop",
    public prdPrice: number = 700,
    public features: string[] = []
  ) {}
}

class ConcreteBuilder1 implements Builder {
  resPrd: Product1;
  constructor() {
    this.resPrd = new Product1();
  }
  reset(): void {
    this.resPrd = new Product1();
  }
  buildStepA(): void {
    this.resPrd.prdName += " 16";
    this.resPrd.features.push("ChatGPT with Siri");
  }
  buildStepB(): void {
    this.resPrd.prdName += " Pro";
    this.resPrd.prdPrice += 100;
    this.resPrd.features.push("Camera with Sticekrs");
  }
  buildStepC(): void {
    this.resPrd.prdName += " Max";
    this.resPrd.prdPrice += 200;
    this.resPrd.features.push("Ultra FPS for Games");
  }
  getResult(): Product {
    const res = this.resPrd;
    this.reset();
    return res;
  }
}

class ConcreteBuilder2 implements Builder {
  resPrd: Product2;
  constructor() {
    this.resPrd = new Product2();
  }
  reset(): void {
    this.resPrd = new Product2();
  }
  buildStepA(): void {
    this.resPrd.prdName += " Mega";
    this.resPrd.features.push("Microsoft Copilot");
  }
  buildStepB(): void {
    this.resPrd.prdName += " Pro";
    this.resPrd.prdPrice += 150;
    this.resPrd.features.push("More Ram Added");
  }
  buildStepC(): void {
    this.resPrd.prdName += " Max";
    this.resPrd.prdPrice += 200;
    this.resPrd.features.push("Ultra HD Graphics for Video Streaming");
  }
  getResult(): Product {
    const res = this.resPrd;
    this.reset();
    return res;
  }
}

class Director {
  builder: Builder;
  constructor(builder: Builder) {
    this.builder = builder;
  }
  changeBuilder(builder: Builder) {
    this.builder = builder;
  }
  makePrd(type: string) {
    if (type === "simple") {
      // Same
    } else if (type === "pro") {
      this.builder.buildStepA();
    } else if (type === "ultra") {
      this.builder.buildStepA();
      this.builder.buildStepB();
    } else if (type === "advance") {
      this.builder.buildStepA();
      this.builder.buildStepB();
      this.builder.buildStepC();
    } else {
      console.log(chalk.bold("Invalid type statement..."));
    }
  }
}

function logFun(tempPrd: Product) {
  console.log(chalk.magenta(`Product Name: ${tempPrd.prdName}`));
  console.log(chalk.red(`Price: ${tempPrd.prdPrice}`));
  console.log(chalk.cyan(`Features: ${tempPrd.features}\n`));
}

function clientLogic(builder1: Builder, builder2: Builder) {
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
  console.log(chalk.yellow("Builder:"));
  clientLogic(new ConcreteBuilder1(), new ConcreteBuilder2());
}

export { main };
