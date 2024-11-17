import chalk from "chalk";

interface HttpRequest {
  headers: {
    authToken: string;
  };
  body: {
    role: string;
    from: string;
    to: string;
    msg: string;
  };
}

interface Handler {
  setNext(h: Handler): void;
  handle(req: HttpRequest): void;
}

class BaseHandler implements Handler {
  next: Handler | null = null;
  setNext(h: Handler): void {
    this.next = h;
  }
  handle(req: HttpRequest): void {
    if (this.next !== null) {
      this.next.handle(req);
    }
  }
}

class FinalServiceHandler extends BaseHandler {
  handle(req: HttpRequest): void {
    console.log(
      chalk.redBright(
        `Your message is sent from ${req.body.from} to ${req.body.to}. The message sent was: ${req.body.msg}`
      )
    );
  }
}

class AuthenticateHandler extends BaseHandler {
  handle(req: HttpRequest): void {
    // You can fetch the authtoken from DB and see it is exists, etc. etc. For example purpose
    // I am doing it directly
    if (req.headers.authToken !== "cat") {
      console.log(chalk.red("Error! wrong Auth Token"));
    } else {
      super.handle(req);
    }
  }
}

class AuthorizationHandler extends BaseHandler {
  handle(req: HttpRequest): void {
    // You can fetch the user from DB and check their role. For example purpose I am doing
    // it right here!
    if (req.body.role !== "admin") {
      console.log(
        chalk.red("Error! You are not allowed! Role:", req.body.role)
      );
    } else {
      super.handle(req);
    }
  }
}

class ValidateHandler extends BaseHandler {
  canHandle(msg: string): boolean {
    return msg.trim() === "";
  }
  handle(req: HttpRequest): void {
    // This is done on the frontend itself! Just for example purpose I am doing it right here!
    if (this.canHandle(req.body.msg)) {
      console.log(chalk.red("Error! Empty message not allowed!"));
    } else {
      super.handle(req);
    }
  }
}

function clientLogic() {
  const httpReq: HttpRequest = {
    headers: { authToken: "dog" },
    body: { from: "Manoja", to: "Vilas", role: "user", msg: "    " },
  };
  const serviceHand = new FinalServiceHandler();
  const validHand = new ValidateHandler();
  validHand.setNext(serviceHand);
  const authorHand = new AuthorizationHandler();
  authorHand.setNext(validHand);
  const authenHand = new AuthenticateHandler();
  authenHand.setNext(authorHand);
  const handChain = authenHand;
  // You can also do something like setBack. That feels like ExpressJS Middleware Vibes!
  handChain.handle(httpReq);
  httpReq.headers.authToken = "cat";
  handChain.handle(httpReq);
  httpReq.body.role = "admin";
  handChain.handle(httpReq);
  httpReq.body.msg = "Hello Tiger!";
  handChain.handle(httpReq);
}

function main() {
  console.log(chalk.yellow("Chain of Responsibility:"));
  clientLogic();
}

export { main };
