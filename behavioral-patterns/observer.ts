import chalk from "chalk";

interface Subscriber<T> {
  update(context: Publisher<T>): void;
}

// Like Newsletter publisher. Like Content publisher.
class Publisher<T> {
  subscribers: Subscriber<T>[];
  // The main state can be anything
  mainState: T;
  constructor(initState: T) {
    this.mainState = initState;
    this.subscribers = [];
  }
  subscribe(s: Subscriber<T>) {
    const found = this.subscribers.find((sub) => sub === s);
    if (!found) {
      this.subscribers.push(s);
    }
  }
  unSubscribe(s: Subscriber<T>) {
    this.subscribers = this.subscribers.filter((sub) => sub !== s);
  }
  notifySubscribers() {
    for (const s of this.subscribers) {
      s.update(this);
    }
  }
  // Main Business Logic
  setState(state: T) {
    this.mainState = state;
  }
}

class SMSAlert<T> implements Subscriber<T> {
  typeId: string = "SMS";
  update(context: Publisher<T>): void {
    console.log(
      chalk.red(
        `${this.typeId} type Subscriber got notified, ${chalk.cyan(
          context.mainState
        )}`
      )
    );
  }
}

class EmailAlert<T> implements Subscriber<T> {
  typeId: string = "Email";
  update(context: Publisher<T>): void {
    console.log(
      chalk.red(
        `${this.typeId} type Subscriber got notified, ${chalk.cyan(
          context.mainState
        )}`
      )
    );
  }
}

class WhatsAppAlert<T> implements Subscriber<T> {
  typeId: string = "WhatsApp";
  update(context: Publisher<T>): void {
    console.log(
      chalk.red(
        `${this.typeId} type Subscriber got notified, ${chalk.cyan(
          context.mainState
        )}`
      )
    );
  }
}

class FacebookAlert<T> implements Subscriber<T> {
  typeId: string = "Facebook";
  update(context: Publisher<T>): void {
    console.log(
      chalk.red(
        `${this.typeId} type Subscriber got notified, ${chalk.cyan(
          context.mainState
        )}`
      )
    );
  }
}

function clientLogic() {
  // First create a publishers and subscribers.
  const pub = new Publisher("Hello Tiger!");
  const smsAlert = new SMSAlert<string>();
  const whatsappAlert = new WhatsAppAlert<string>();
  const facebookAlert = new FacebookAlert<string>();
  const emailAlert = new EmailAlert<string>();
  pub.subscribe(smsAlert);
  pub.subscribe(whatsappAlert);
  pub.subscribe(facebookAlert);
  pub.subscribe(emailAlert);
  pub.notifySubscribers();
  console.log(
    chalk.yellow("Changing state, and unsubscribing some subscribers!")
  );
  pub.setState("Hello Multiverse");
  pub.unSubscribe(facebookAlert);
  pub.notifySubscribers();
}

function main() {
  console.log(chalk.yellow("Observer:"));
  clientLogic();
}

export { main };
