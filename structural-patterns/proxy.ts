import chalk from "chalk";

interface HTTPNeccessaryInfo {
  ipAddress: string;
  location: string;
}

interface Service {
  operation(httpInfo: HTTPNeccessaryInfo): void;
}

class WebsiteBannedInMyCountry implements Service {
  operation(httpInfo: HTTPNeccessaryInfo): void {
    if (httpInfo.location === "India") {
      console.log(
        chalk.red(
          "Sorry the Serivce is banned in your country:",
          httpInfo.location
        )
      );
    } else {
      console.log(chalk.redBright("Hello Tiger! Welcome to My Service!!"));
      console.log(
        chalk.redBright("You are calling this service from:", httpInfo.location)
      );
    }
  }
}

class VPNInUK implements Service {
  realService: Service;
  wantAccess: boolean;
  httpInfo: HTTPNeccessaryInfo = { ipAddress: "10.123.142.1", location: "UK" };
  constructor(realService: Service, wantAccess: boolean) {
    this.realService = realService;
    this.wantAccess = wantAccess;
  }
  checkAccess(): boolean {
    // Here you can check business access logic! Like if a customer has a
    // subscription model to give him access.
    return this.wantAccess;
  }
  operation(httpInfo: HTTPNeccessaryInfo): void {
    // You can do anything here before calling the realService!
    if (this.checkAccess()) {
      this.realService.operation(this.httpInfo);
    } else {
      console.log(chalk.red("Sorry No Access for you!"));
    }
  }
}

function clientLogic() {
  const realService = new WebsiteBannedInMyCountry();
  const httpInfo: HTTPNeccessaryInfo = {
    ipAddress: "145.156.234.10",
    location: "India",
  };
  realService.operation(httpInfo);
  const vpnUK1 = new VPNInUK(realService, true);
  vpnUK1.operation(httpInfo);
}

function main() {
  console.log(chalk.yellow("Proxy:"));
  // This can be Reverse Proxy (Load Balancing), and Forward Proxy (Website Link Forward)
  // as you know in HLD!
  clientLogic();
}

export { main };
