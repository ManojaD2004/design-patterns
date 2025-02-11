import chalk from "chalk";

class TemplateMethod {
  templateMethod() {
    this.step1();
    if (this.step2()) {
      this.step3();
    }
    this.step4();
    this.step5();
    this.step6();
  }
  // Intro
  step1() {
    console.log(chalk.cyan(`Welcome to our Hotel!`));
  }
  step2() {
    // additional dialog (like veg or non-veg choice)
    return true;
  }
  // Additional dialog
  step3() {
    console.log(chalk.cyan(`Do you want veg or non-veg food?`));
  }
  // Customer service
  step4() {
    console.log(chalk.cyan(`What would you like to have?`));
  }
  // Lunch process
  step5() {
    console.log(chalk.cyanBright(`After having lunch!`));
  }
  // Ask for feedback/review from customers
  step6() {
    console.log(
      chalk.cyan(
        `Thank you, please review our service and do visit us in future!`
      )
    );
  }
}

class HotelABC extends TemplateMethod {
  // Jump to place the orders
  step2(): boolean {
    return false;
  }
}

class HotelVeg extends TemplateMethod {
  // If already veg, don't ask them the choice
  step3(): void {
    console.log(chalk.cyan(`Look at our web page for best selling items!`));
  }
  step4() {
    console.log(
      chalk.cyan(`What would you like to have, Masala Dosa, Idli, or Rice Bath?`)
    );
  }
}

class HotelNonVeg extends TemplateMethod {
  // If already non-veg, don't ask them the choice
  step3(): void {
    console.log(
      chalk.cyan(`Scan the OR code and Order from the web app we have!`)
    );
  }
  step4() {
    console.log(
      chalk.cyan(`Do look into top selling items like, Biryani, Kebab, or Butter naan?`)
    );
  }
}

function clientLogic() {
  const t = new TemplateMethod();
  console.log(chalk.red(`Default:`));
  t.templateMethod();
  console.log(chalk.red(`HotelABC:`));
  const abc = new HotelABC();
  abc.templateMethod();
  console.log(chalk.red(`HotelVeg:`));
  const v = new HotelVeg();
  v.templateMethod();
  console.log(chalk.red(`HotelNonVeg:`));
  const nv = new HotelNonVeg();
  nv.templateMethod();
}

function main() {
  console.log(chalk.yellow("Template Method:"));
  clientLogic();
}

export { main };
