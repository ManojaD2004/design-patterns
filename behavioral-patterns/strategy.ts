import chalk from "chalk";

interface Strategy {
  execute(kmTraveled: number): void;
}

class Context {
  private stra: Strategy | null = null;
  setStrategy(stra: Strategy) {
    this.stra = stra;
  }
  // kmTraveled is km traveled
  straExecute(kmTraveled: number) {
    if (this.stra) {
      this.stra.execute(kmTraveled);
    } else {
      console.log(chalk.red(`The strategy is null`));
    }
  }
}

class WalkStrategy implements Strategy {
  execute(kmTraveled: number): void {
    console.log(
      chalk.red(
        `The total cost by walking, of ${kmTraveled} KM will be $${
          kmTraveled * 1
        }`
      )
    );
  }
}

class BikeStrategy implements Strategy {
  execute(kmTraveled: number): void {
    console.log(
      chalk.red(
        `The total cost by bike, of ${kmTraveled} KM will be $${kmTraveled * 2}`
      )
    );
  }
}

class CarStrategy implements Strategy {
  execute(kmTraveled: number): void {
    console.log(
      chalk.red(
        `The total cost by car, of ${kmTraveled} KM will be $${kmTraveled * 4}`
      )
    );
  }
}

class BoatStrategy implements Strategy {
  execute(kmTraveled: number): void {
    console.log(
      chalk.red(
        `The total cost by boat, of ${kmTraveled} KM will be $${
          kmTraveled * 10
        }`
      )
    );
  }
}

class AirplaneStrategy implements Strategy {
  execute(kmTraveled: number): void {
    console.log(
      chalk.red(
        `The total cost by airplane, of ${kmTraveled} KM will be $${
          kmTraveled * 20
        }`
      )
    );
  }
}

function clientLogic() {
  // create a context
  const cont = new Context();
  const kmTraveled = 30;
  // create strategies
  const bikeStra = new BikeStrategy();
  const carStra = new CarStrategy();
  const boatStra = new BoatStrategy();
  const walkStra = new WalkStrategy();
  const airplaneStra = new AirplaneStrategy();
  // set strategy and execute them
  cont.setStrategy(bikeStra);
  cont.straExecute(kmTraveled);
  cont.setStrategy(carStra);
  cont.straExecute(kmTraveled);
  cont.setStrategy(boatStra);
  cont.straExecute(kmTraveled);
  cont.setStrategy(walkStra);
  cont.straExecute(kmTraveled);
  cont.setStrategy(airplaneStra);
  cont.straExecute(kmTraveled);
}

function main() {
  console.log(chalk.yellow("Strategy:"));
  clientLogic();
}

export { main };
