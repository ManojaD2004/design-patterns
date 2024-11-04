import chalk from "chalk";

interface Prototype {
  clone(): Prototype;
}

class ConcretePrototype implements Prototype {
  data: string;
  constructor(data: string);
  constructor(prototype: ConcretePrototype);
  constructor(x: string | ConcretePrototype);
  constructor(x: string | ConcretePrototype) {
    if (typeof x === "string") {
      this.data = x;
    } else {
      this.data = x.data;
    }
  }
  clone() {
    return new ConcretePrototype(this);
  }
}

class SubConcretePrototype extends ConcretePrototype {
  data2: string;
  dateData: Date;
  comp: ComponentWithBackReference;
  constructor(data: string);
  constructor(prototype: SubConcretePrototype);
  constructor(x: string | SubConcretePrototype);
  constructor(x: string | SubConcretePrototype) {
    if (typeof x === "string") {
      super(x + " " + x);
      this.data2 = x;
    } else {
      super(x);
      this.data2 = x.data2;
    }
    this.dateData = new Date("2024-11-05");
    this.comp = new ComponentWithBackReference(this);
  }
  clone() {
    return new SubConcretePrototype(this);
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

function clientLogic<T extends Prototype>(prototype: T): T {
  const newClone = prototype.clone() as T;
  return newClone;
}

function main() {
  console.log(chalk.yellow("Prototype:"));
  const newObj = new ConcretePrototype("Hello Tiger!");
  console.log(chalk.magenta("New Object Create!"));
  const newCloneObj = clientLogic(newObj);
  console.log(chalk.magenta("New Clone Object Create!"));
  if (newObj.data === newCloneObj.data) {
    console.log(chalk.blue("The objects have cloned Primitive Values!"));
    console.log(newObj);
    console.log(newCloneObj);
  } else {
    console.log(chalk.blue("The objects have not cloned Primitive Values!"));
    console.log(newObj);
    console.log(newCloneObj);
  }
  const newSubObj = new SubConcretePrototype("Hello Tiger!");
  console.log(chalk.magenta("New Sub Object Create!"));
  const newSubCloneObj = clientLogic(newSubObj);
  console.log(chalk.magenta("New Clone Sub Object Create!"));
  if (
    newSubObj.comp === newSubCloneObj.comp ||
    newSubObj.dateData === newSubCloneObj.dateData
  ) {
    console.log(
      chalk.blue("The Sub objects are not Clone (has same references)!")
    );
    console.log(newSubObj);
    console.log(newSubCloneObj);
  } else {
    console.log(
      chalk.blue("The Sub objects are Clone (has different references)!")
    );
    console.log(newSubObj);
    console.log(newSubCloneObj);
  }
}

export { main };
