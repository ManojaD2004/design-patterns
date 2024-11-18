import chalk from "chalk";

interface Memento<T> {
  state: T;
  getState(): T;
}

class ConcMemento<T> implements Memento<T> {
  state: T;
  constructor(state: T) {
    this.state = state;
  }
  getState(): T {
    return this.state;
  }
}

class Originator<T> {
  // The state can be anything.
  protected state: T;
  constructor(state: T) {
    this.state = state;
  }
  save(): ConcMemento<T> {
    return new ConcMemento(this.state);
  }
  restore(m: ConcMemento<T>) {
    this.state = m.getState();
  }
  setState(state: T) {
    this.state = state;
  }
  getState(): T {
    return this.state;
  }
}

class CareTaker<T> {
  originator: Originator<T>;
  history: Memento<T>[];
  constructor(originator: Originator<T>) {
    this.originator = originator;
    this.history = [this.originator.save()];
  }
  undo() {
    this.history.pop();
    if (this.history.length > 0) {
      this.originator.restore(this.history[this.history.length - 1]);
    }
  }
  makeChange(change: T) {
    this.originator.setState(change);
    this.history.push(this.originator.save());
  }
  readState(): T {
    return this.originator.getState();
  }
}

function readStateFun(careTakerEditor: CareTaker<string>) {
  console.log(
    chalk.red(
      `The current state is: ${chalk.cyan(careTakerEditor.readState())}`
    )
  );
}

function clientLogic() {
  // Create Originator, which can be GUI interface in many cases!
  const newOriginator = new Originator("First Snapshot");
  // Create CareTaker which can be editor in many cases!
  const careTakerEditor = new CareTaker(newOriginator);
  readStateFun(careTakerEditor);
  careTakerEditor.makeChange("Next State");
  readStateFun(careTakerEditor);
  careTakerEditor.makeChange("Hello Tiger!");
  readStateFun(careTakerEditor);
  careTakerEditor.makeChange("Hello Tiger Again!");
  readStateFun(careTakerEditor);
  careTakerEditor.undo();
  readStateFun(careTakerEditor);
  careTakerEditor.undo();
  readStateFun(careTakerEditor);
  careTakerEditor.undo();
  readStateFun(careTakerEditor);
  // Has reached its limits. Can't do anything. The initial state can be empty string
  // Or any other state too.
  careTakerEditor.undo();
  readStateFun(careTakerEditor);
}

function main() {
  console.log(chalk.yellow("Memento:"));
  clientLogic();
}

export { main };
