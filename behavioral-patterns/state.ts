import chalk from "chalk";

interface State {
  touchScreen(): void;
  turnOnOff(): void;
  typeSomething(data: string): void;
}

class PhoneContext implements State {
  protected state: State | null = null;
  changeState(state: State) {
    this.state = state;
  }
  touchScreen(): void {
    if (this.state) {
      this.state.touchScreen();
    } else {
      console.log(chalk.red(`Give an Initial state!`));
    }
  }
  turnOnOff(): void {
    if (this.state) {
      this.state.turnOnOff();
    } else {
      console.log(chalk.red(`Give an Initial state!`));
    }
  }
  typeSomething(data: string): void {
    if (this.state) {
      this.state.typeSomething(data);
    } else {
      console.log(chalk.red(`Give an Initial state!`));
    }
  }
}

class PhoneOnLocked implements State {
  context: PhoneContext;
  constructor(context: PhoneContext) {
    this.context = context;
  }
  setContext(context: PhoneContext) {
    this.context = context;
  }
  touchScreen(): void {
    console.log(chalk.cyan(`Please enter password to UnLock your phone!`));
  }
  turnOnOff(): void {
    console.log(chalk.red(`You are just Turned Off your Phone!`));
    this.context.changeState(new PhoneOff(this.context));
  }
  typeSomething(data: string): void {
    console.log(chalk.cyan(`You just typed your password: "${data}"`));
    if (data === "cat") {
      console.log(chalk.cyan(`Correct Password, you can now use your phone!`));
      this.context.changeState(new PhoneOnUnLocked(this.context));
    } else {
      console.log(chalk.cyan(`Incorrect Password, you cannot use your phone!`));
    }
  }
}

class PhoneOnUnLocked implements State {
  context: PhoneContext;
  constructor(context: PhoneContext) {
    this.context = context;
  }
  setContext(context: PhoneContext) {
    this.context = context;
  }
  touchScreen(): void {
    console.log(chalk.cyan(`You just clicked your phone!`));
  }
  turnOnOff(): void {
    console.log(chalk.red(`You are just Turned Off your Phone!`));
    this.context.changeState(new PhoneOff(this.context));
  }
  typeSomething(data: string): void {
    console.log(chalk.cyan(`You just typed something: "${data}"`));
  }
}

class PhoneOff implements State {
  context: PhoneContext;
  constructor(context: PhoneContext) {
    this.context = context;
  }
  setContext(context: PhoneContext) {
    this.context = context;
  }
  touchScreen(): void {
    console.log(chalk.cyan(`You phone is off, please Turn On!`));
  }
  turnOnOff(): void {
    console.log(chalk.red(`You are just Turned On your Phone!`));
    this.context.changeState(new PhoneOnLocked(this.context));
  }
  typeSomething(data: string): void {
    this.touchScreen();
  }
}

function clientLogic() {
  // Creat Phone Context, with initial state and start using the phone!
  const phoneContext = new PhoneContext();
  const phoneOff = new PhoneOff(phoneContext);
  phoneContext.changeState(phoneOff);
  phoneContext.typeSomething("Hello Tiger!");
  phoneContext.turnOnOff();
  phoneContext.touchScreen();
  phoneContext.typeSomething("Hello Tiger!");
  phoneContext.typeSomething("cat");
  phoneContext.touchScreen();
  phoneContext.typeSomething("Hello Tiger!");
  phoneContext.turnOnOff();
  phoneContext.touchScreen();
  phoneContext.typeSomething("Hello Tiger!");
}

function main() {
  console.log(chalk.yellow("State:"));
  clientLogic();
}

export { main };
