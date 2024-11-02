abstract class Product {
  constructor(protected prdName: string, protected prdPrice: number) {}
  abstract doSome(): string;
}

class ConcreteProductA extends Product {
  private typePrd = "A";
  constructor(prdName: string, prdPrice: number) {
    super(prdName, prdPrice);
  }
  doSome() {
    return `
    ${this.prdName} is the product name and it is type "${this.typePrd}". 
    Price Is: ${this.prdPrice}`
      .replace(/\s{2,}/g, " ")
      .trim();
  }
}

class ConcreteProductB extends Product {
  private typePrd = "B";
  constructor(prdName: string, prdPrice: number) {
    super(prdName, prdPrice);
  }
  doSome() {
    return `
    ${this.prdName} is the product name and it is type "${this.typePrd}". 
    Price Is: ${this.prdPrice}`
      .replace(/\s{2,}/g, " ")
      .trim();
  }
}

abstract class Creator {
  public abstract createPrd(): Product;
  public someOtherFunc(): void {
    console.log("Independent Working!");
    const tempPrd = this.createPrd();
    const msg = tempPrd.doSome();
    console.log(msg);
  }
}

class ConcreteCreatorA extends Creator {
  createPrd(): Product {
    return new ConcreteProductA("Apple", 100);
  }
  public someOtherFunc(): void {
    // you can override and change the business logic
    console.log("Independent Working Override!");
    const tempPrd = this.createPrd();
    const msg = tempPrd.doSome();
    console.log("Overrided:", msg);
  }
}

class ConcreteCreatorB extends Creator {
  createPrd(): Product {
    return new ConcreteProductB("Carrot", 200);
  }
}

function clientLogic(clientFactory: Creator) {
  clientFactory.someOtherFunc();
}

function main() {
  console.log("Factory:\n");
  clientLogic(new ConcreteCreatorA());
  clientLogic(new ConcreteCreatorB());
}

export { main };
