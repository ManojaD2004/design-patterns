import chalk from "chalk";

// My Product Data Structure
class Product1 {
  constructor(public prdName: string, public prdPrice: number) {}
}

// Friend Product Data Structure
class Product2 {
  constructor(
    public prdName: string,
    public details: {
      prdPrices: {
        default: number;
        india?: number;
        usa?: number;
        china?: number;
        russia?: number;
      };
    }
  ) {}
}

interface Service<T extends Product1 | Product2> {
  priceCheckService(prd1: T, prd2: T): void;
}

class ProductFactory {
  createProduct1(prdName: string, prdPrice: number): Product1 {
    const newPrd: Product1 = {
      prdName: prdName,
      prdPrice: prdPrice,
    };
    return newPrd;
  }
  createProduct2(prdName: string, details: Product2["details"]): Product2 {
    const newPrd: Product2 = {
      prdName: prdName,
      details: details,
    };
    return newPrd;
  }
}
class MyLogicCode implements Service<Product1> {
  priceCheckService(prd1: Product1, prd2: Product1) {
    if (prd1.prdPrice === prd2.prdPrice) {
      console.log(
        chalk.red(`${prd1.prdName} and ${prd2.prdName} are the same price!`)
      );
    } else if (prd1.prdPrice > prd2.prdPrice) {
      console.log(
        chalk.red(`${prd1.prdName} is Greater than ${prd2.prdName} in price!`)
      );
    } else if (prd1.prdPrice < prd2.prdPrice) {
      console.log(
        chalk.red(`${prd1.prdName} is Lesser than ${prd2.prdName} in price!`)
      );
    }
  }
}

class Product2Adapter extends Product1 {
  private adaptee: Product2;
  constructor(adaptee: Product2) {
    super(adaptee.prdName, adaptee.details.prdPrices.default);
    this.adaptee = adaptee;
    // The adaptee can be used in any other methods you want!
  }
}

function clientLogic(
  serviceLogic: MyLogicCode,
  prd1: Product1 | Product2Adapter,
  prd2: Product1 | Product2Adapter
) {
  serviceLogic.priceCheckService(prd1, prd2);
}

function main() {
  console.log(chalk.yellow("Adapter:"));
  //   Better example would be to use Adapter for JSON to XML/YAML, vice versa
  console.log(
    chalk.blue("Creating 2 different products with 2 different types...")
  );
  const prdFact = new ProductFactory();
  const prd1T1 = prdFact.createProduct1("IPhone X", 1000);
  const prd2T1 = prdFact.createProduct1("Dell Ultra", 2000);
  const prd1T2 = prdFact.createProduct2("IPhone X", {
    prdPrices: { default: 1000 },
  });
  const prd2T2 = prdFact.createProduct2("Dell Ultra", {
    prdPrices: { default: 2000 },
  });
  const prd1AT2 = new Product2Adapter(prd1T2);
  const prd2AT2 = new Product2Adapter(prd2T2);
  const serviceLogic = new MyLogicCode();
  clientLogic(serviceLogic, prd1T1, prd2T1);
  clientLogic(serviceLogic, prd1T1, prd2AT2);
  clientLogic(serviceLogic, prd1AT2, prd2T1);
  clientLogic(serviceLogic, prd1AT2, prd2AT2);
  console.log(
    chalk.blue("Adapter makes two different types/data/code to be compatible")
  );
}

export { main };
