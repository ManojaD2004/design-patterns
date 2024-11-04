import chalk from "chalk";

interface Product {
  prdName: string;
  prdFeatures: string[];
  prdPrice: number;
}

class ConcreteProduct implements Product {
  constructor(
    public prdName: string,
    public prdFeatures: string[],
    public prdPrice: number
  ) {}
}

class Singleton {
  private static instance: Product;
  constructor() {
    if (!Singleton.instance) {
      console.log(chalk.bgYellow.red.bold(" Only Once "));
      Singleton.instance = new ConcreteProduct(
        "IPhone",
        ["Good Camera", "High FPS", "Split View Apps"],
        1000
      );
    }
  }
  getInstance(): Product {
    return Singleton.instance;
  }
}

function clientLogic(n: number) {
  console.log(chalk.magenta(`Creating Singleton Object ${n} times:`));
  for (let i = 0; i < n; i++) {
    console.log(chalk.blue(`Creating Singleton Object ${i + 1} time:`));
    const newSingletion = new Singleton();
    const product = newSingletion.getInstance();
    console.log(product);
  }
  console.log(chalk.red(`But only one time the "Product Object" was created!`));
}

function main() {
  console.log(chalk.yellow("Singleton:"));
  const n = 5;
  clientLogic(n);
}

export { main };
