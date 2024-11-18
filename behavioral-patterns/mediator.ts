import chalk from "chalk";

interface Mediator {
  notify(sender: Component): void;
}

interface Component {
  m: Mediator;
  planeId: number;
  priority: number;
  operation(): void;
}

class AirPlane1 implements Component {
  m: Mediator;
  planeId: number;
  priority: number;
  typeId: string = "A1";
  constructor(m: Mediator, planeId: number, priority: number) {
    this.m = m;
    this.planeId = planeId;
    this.priority = priority;
  }
  operation(): void {
    console.log(
      chalk.red(
        `Landing Plane No: ${this.planeId}, Priority: ${this.priority}, Type: ${this.typeId}`
      )
    );
    this.m.notify(this);
  }
}

class AirPlane2 implements Component {
  m: Mediator;
  planeId: number;
  priority: number;
  typeId: string = "A2";
  constructor(m: Mediator, planeId: number, priority: number) {
    this.m = m;
    this.planeId = planeId;
    this.priority = priority;
  }
  operation(): void {
    console.log(
      chalk.red(
        `Landing Plane No: ${this.planeId}, Priority: ${this.priority}, Type: ${this.typeId}`
      )
    );
    this.m.notify(this);
  }
}

class AirPlane3 implements Component {
  m: Mediator;
  planeId: number;
  priority: number;
  typeId: string = "A3";
  constructor(m: Mediator, planeId: number, priority: number) {
    this.m = m;
    this.planeId = planeId;
    this.priority = priority;
  }
  operation(): void {
    console.log(
      chalk.red(
        `Landing Plane No: ${this.planeId}, Priority: ${this.priority}, Type: ${this.typeId}`
      )
    );
    this.m.notify(this);
  }
}

class AirPlane4 implements Component {
  m: Mediator;
  planeId: number;
  priority: number;
  typeId: string = "A4";
  constructor(m: Mediator, planeId: number, priority: number) {
    this.m = m;
    this.planeId = planeId;
    this.priority = priority;
  }
  operation(): void {
    console.log(
      chalk.red(
        `Landing Plane No: ${this.planeId}, Priority: ${this.priority}, Type: ${this.typeId}`
      )
    );
    this.m.notify(this);
  }
}

class AirTraffic implements Mediator {
  queueAir: Component[];
  constructor() {
    this.queueAir = [];
  }
  addAir(c: Component) {
    this.queueAir.push(c);
  }
  notify(sender: Component): void {
    this.queueAir = this.queueAir.filter((c) => c !== sender);
    this.landNextPlanes();
  }
  landNextPlanes() {
    let i1 = -1;
    for (let i = 0; i < this.queueAir.length; i++) {
      if (i1 === -1 || this.queueAir[i].priority > this.queueAir[i1].priority) {
        i1 = i;
      }
    }
    if (i1 !== -1) {
      this.queueAir[i1].operation();
    }
  }
  landPlanes() {
    this.landNextPlanes();
  }
}

function clientLogic() {
  // Create AirTraffic Mediator
  const airTraffic = new AirTraffic();
  // Create 6 AirPlanes with different types.
  const air1 = new AirPlane1(airTraffic, 1, 3);
  const air2 = new AirPlane1(airTraffic, 2, 5);
  const air3 = new AirPlane2(airTraffic, 3, 999);
  const air4 = new AirPlane2(airTraffic, 4, 2);
  const air5 = new AirPlane3(airTraffic, 5, 1);
  const air6 = new AirPlane4(airTraffic, 6, 1);
  airTraffic.addAir(air1);
  airTraffic.addAir(air2);
  airTraffic.addAir(air3);
  airTraffic.addAir(air4);
  airTraffic.addAir(air5);
  airTraffic.addAir(air6);
  // Every single command to communicate with other components has to go through Mediator.
  airTraffic.landPlanes();
}

function main() {
  console.log(chalk.yellow("Mediator:"));
  clientLogic();
}

export { main };
