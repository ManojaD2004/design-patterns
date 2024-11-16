import chalk from "chalk";

interface Notifier {
  send(msg: string): void;
}

class ConcNotifier implements Notifier {
  type: string = "SMS";
  send(msg: string): void {
    console.log(
      chalk.red("Message of type:", this.type, ", is sent. The message is:", chalk.blue(msg))
    );
  }
}

class BaseNotifier implements Notifier {
  wrappee: Notifier;
  constructor(wrappee: Notifier) {
    this.wrappee = wrappee;
  }
  send(msg: string) {
    this.wrappee.send(msg);
  }
}

class FacebookNotifier extends BaseNotifier {
  type: string = "Facebook";
  constructor(wrappee: Notifier) {
    super(wrappee);
  }
  send(msg: string) {
    super.send(msg);
    this.sendMsg(msg);
  }
  sendMsg(msg: string) {
    console.log(
      chalk.red("Message of type:", this.type, "is sent. The message is:", chalk.blue(msg))
    );
  }
}

class WhatsAppNotifier extends BaseNotifier {
  type: string = "WhatsApp";
  constructor(wrappee: Notifier) {
    super(wrappee);
  }
  send(msg: string) {
    super.send(msg);
    this.sendMsg(msg);
  }
  sendMsg(msg: string) {
    console.log(
      chalk.red("Message of type:", this.type, "is sent. The message is:", chalk.blue(msg))
    );
  }
}

class DiscordNotifier extends BaseNotifier {
  type: string = "Discord";
  constructor(wrappee: Notifier) {
    super(wrappee);
  }
  send(msg: string) {
    // You can also do this after, call the super class afterwards. Like reading.
    super.send(msg);
    this.sendMsg(msg);
  }
  sendMsg(msg: string) {
    console.log(
      chalk.red("Message of type:", this.type, "is sent. The message is:", chalk.blue(msg))
    );
  }
}

function clientLogic() {
  const smsNoti = new ConcNotifier();
  const facebookNoti = new FacebookNotifier(smsNoti);
  const whatsappNoti = new WhatsAppNotifier(facebookNoti);
  const discordNoti = new DiscordNotifier(whatsappNoti);
  // Discord one
  discordNoti.send("Does this work!");
  // Facebook one
  console.log();
  facebookNoti.send("Lets see how this works!");
}

function main() {
  console.log(chalk.yellow("Decorator:"));
  clientLogic();
}

export { main };
