import chalk from "chalk";

interface Product1 {
  prdName: string;
  prdPrice: number;
}

interface Product2 {
  prdName: string;
  details: {
    prdPrices: {
      default: number;
      india?: number;
      usa?: number;
      china?: number;
      russia?: number;
    };
  };
}

interface Service<T extends Product1 | Product2> {
  priceCheckService(prdData1: T, prdData2: T): void;
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
  priceCheckService(prdData1: Product1, prdData2: Product1) {
    if (prdData1.prdPrice === prdData2.prdPrice) {
      console.log(
        chalk.red(
          `${prdData1.prdName} and ${prdData2.prdName} are the same price!`
        )
      );
    } else if (prdData1.prdPrice > prdData2.prdPrice) {
      console.log(
        chalk.red(
          `${prdData1.prdName} is Greater than ${prdData2.prdName} in price!`
        )
      );
    } else if (prdData1.prdPrice < prdData2.prdPrice) {
      console.log(
        chalk.red(
          `${prdData1.prdName} is Lesser than ${prdData2.prdName} in price!`
        )
      );
    }
  }
}

class MyFriendLogicCode implements Service<Product2> {
  priceCheckService(prdData1: Product2, prdData2: Product2) {
    if (
      prdData1.details.prdPrices.default === prdData2.details.prdPrices.default
    ) {
      console.log(
        chalk.red(
          `${prdData1.prdName} and ${prdData2.prdName} are the same price!`
        )
      );
    } else if (
      prdData1.details.prdPrices.default > prdData2.details.prdPrices.default
    ) {
      console.log(
        chalk.red(
          `${prdData1.prdName} is Greater than ${prdData2.prdName} in price!`
        )
      );
    } else if (
      prdData1.details.prdPrices.default < prdData2.details.prdPrices.default
    ) {
      console.log(
        chalk.red(
          `${prdData1.prdName} is Lesser than ${prdData2.prdName} in price!`
        )
      );
    }
  }
}

class ProductAdapter implements Service<Product1 | Product2> {
  adaptee: Service<Product1 | Product2>;
  constructor(adaptee: Service<Product1 | Product2>) {
    this.adaptee = adaptee;
  }
  priceCheckService(
    prdData1: Product1 | Product2,
    prdData2: Product1 | Product2
  ) {
    if (this.isProduct1(prdData1) === true) {
        
    }
  }
  isProduct1(prd: Product1 | Product2): prd is Product1 {
    if ((prd as Product1).prdPrice !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}

function clientLogic() {}

function main() {
  console.log(chalk.yellow("Adapter:"));
  //   Better example would be to use Adapter for JSON to XML/YAML, vice versa
  const n = 5;
  clientLogic();
}

export { main };
