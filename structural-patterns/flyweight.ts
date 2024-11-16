import chalk from "chalk";

interface RepState {
  shadowColor: string;
  imageSrc: string;
}

interface UniqueState {
  ballId: number;
  x: number;
  y: number;
  size: number;
}

class FlyweightBall {
  repeatingState: RepState;
  constructor(repState: RepState) {
    this.repeatingState = repState;
  }
  operation(uniqueState: UniqueState) {
    console.log(
      chalk.red(
        `BallId: ${uniqueState.ballId}, x: ${uniqueState.x}, y: ${uniqueState.y}, size: ${uniqueState.size}`
      )
    );
    console.log(
      chalk.yellowBright(
        `ImgSrc: ${this.repeatingState.imageSrc}, ShadowColor: ${this.repeatingState.shadowColor}`
      )
    );
  }
}

class FlyweightBallFactory {
  // You can do it as a Instance too!
  // But static is good, perfect, as we need a single instance across all the program!
  static cache: FlyweightBall[] = [];
  static getFlyweightBall(repState: RepState): FlyweightBall {
    for (const element of FlyweightBallFactory.cache) {
      if (repState === element.repeatingState) {
        return element;
      }
    }
    FlyweightBallFactory.cache.push(new FlyweightBall(repState));
    return FlyweightBallFactory.cache[FlyweightBallFactory.cache.length - 1];
  }
  static getCacheLength() {
    return FlyweightBallFactory.cache.length;
  }
}

class ContextBall {
  uniqueState: UniqueState;
  flyweight: FlyweightBall;
  constructor(repState: RepState, uniqueState: UniqueState) {
    this.uniqueState = uniqueState;
    this.flyweight = FlyweightBallFactory.getFlyweightBall(repState);
  }
  operation() {
    this.flyweight.operation(this.uniqueState);
  }
}

class HTMLPageOfBalls {
  ballDesign: RepState[];
  balls: ContextBall[];
  constructor(ballDesign: RepState[]) {
    this.ballDesign = ballDesign;
    this.balls = [];
  }
  createBalls(n: number = 10) {
    for (let i = 1; i <= n; i++) {
      // Assume Window screen is of 1000 x 1000 pixels
      const x = Math.random() * 1000;
      const y = Math.random() * 1000;
      // Assume size can be of 1 to 5
      const size = Math.floor(Math.random() * (5 - 1)) + 1;
      this.balls.push(
        new ContextBall(
          this.ballDesign[Math.floor(Math.random() * this.ballDesign.length)],
          { ballId: i, x, y, size }
        )
      );
    }
  }
  operation(n: number = 10) {
    for (let i = 0; i < n; i++) {
      this.balls[i].operation();
    }
    console.log(
      "Total Number of Repeating State used:",
      FlyweightBallFactory.getCacheLength()
    );
    console.log("Total Number of Balls Created:", this.balls.length);
  }
}

function clientLogic() {
  // Lets render 1000 ball in a HTML page.
  // Lets save some, I mean lot of memory!
  const n = 1000;
  const ballDesign: RepState[] = [
    { imageSrc: "./someball1.jpg", shadowColor: "red" },
    { imageSrc: "./someball2.jpg", shadowColor: "red" },
    { imageSrc: "./someball3.jpg", shadowColor: "yellow" },
  ];
  const htmlPage = new HTMLPageOfBalls(ballDesign);
  htmlPage.createBalls(n);
  htmlPage.operation(10);
}

function main() {
  console.log(chalk.yellow("Fly Weight:"));
  clientLogic();
}

export { main };
