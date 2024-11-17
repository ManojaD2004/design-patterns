import chalk from "chalk";

interface Command {
  execute(): void;
  // Better way of doing it!
  // execute(...data: any): void;
}

class Invoker {
  command: Command | null = null;
  setCommand(c: Command) {
    this.command = c;
  }
  // You can pass params to execute command, that is a prefer way of doing it!
  executeCommand() {
    if (this.command) {
      this.command.execute();
    }
  }
}

class Button extends Invoker {
  constructor(public color: string) {
    super();
  }
  // Remaining Methods
}

class ShortCut extends Invoker {
  constructor(public shortCutKey: string) {
    super();
  }
  // Remaining Methods
}

class Receiver {
  operation(data: string) {
    console.log(`Received Data: ${data}!`);
  }
}

class Editor extends Receiver {
  operation(data: string) {
    // Save this data else where
    console.log(
      chalk.red(`Editor has Saved the Data: ${chalk.redBright(data)}`)
    );
  }
}

class SaveCommand implements Command {
  // Receiver can be anything
  receiver: Receiver;
  params: string;
  constructor(receiver: Receiver, params: string) {
    this.receiver = receiver;
    this.params = params;
  }
  setParams(params: string) {
    this.params = params;
  }
  // You can pass params to execute method, that is a prefer way of doing it!
  execute(): void {
    this.receiver.operation(this.params);
  }
}

function clientLogic() {
  // First create a editor
  const editor = new Editor();
  // Pass it to command
  const saveCommand = new SaveCommand(editor, "Hello Tiger!");
  // Pass the command to invoker like button, shortcut key, etc.
  const redButton = new Button("red");
  const shortCutKey = new ShortCut("ctrl+k");
  redButton.setCommand(saveCommand);
  shortCutKey.setCommand(saveCommand);
  redButton.executeCommand();
  saveCommand.setParams("Hello Multiverse!");
  shortCutKey.executeCommand();
}

function main() {
  console.log(chalk.yellow("Command:"));
  // Command links Sender and Receiver
  // like GUI and Business logic.
  clientLogic();
}

export { main };
