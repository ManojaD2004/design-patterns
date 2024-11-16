import chalk from "chalk";

class FacadeReadingDB {
  public dbConc: DataBaseConnection;
  public readFormat: ReadUserDeatils;
  constructor() {
    this.dbConc = new DataBaseConnection();
    this.readFormat = new ReadUserDeatils();
  }
  addToDb(jsonOb: { username: string; emailid: string; age: number }) {
    const user1 = this.dbConc.readFromDb(jsonOb.username);
    if (user1) {
      console.log(chalk.red("Username Already Exists: "));
      this.readFormat.readUser(user1);
    } else {
      this.dbConc.addUser(
        new UserDetails(jsonOb.username, jsonOb.age, jsonOb.emailid)
      );
    }
  }
  readFromDB(username: string) {
    const user1 = this.dbConc.readFromDb(username);
    if (user1) {
      console.log(chalk.red("User Details: "));
      this.readFormat.readUser(user1);
    }
  }
}

class MongoDbFacadeDb extends FacadeReadingDB {
  // Extra/overiding methods
}

class UserDetails {
  constructor(
    public username: string,
    public age: number,
    public emailid: string,
    public addDetails: string[] = []
  ) {}
}

class DataBase {
  tableUser: UserDetails[] = [];
  //   Additional Fields/Methods
}

class DataBaseConnection {
  static db: DataBase;
  //   This could be like real DB connection, like PSQL connection, instead of static DB.
  constructor() {
    if (!DataBaseConnection.db) {
      DataBaseConnection.db = new DataBase();
    }
  }
  readFromDb(username: string) {
    return DataBaseConnection.db.tableUser.find(
      (val) => val.username === username
    );
  }
  addUser(newUser: UserDetails) {
    DataBaseConnection.db.tableUser.push(newUser);
  }
  //   Additional Methods
}

class ReadUserDeatils {
  readUser(user1: UserDetails) {
    console.log(chalk.blue("Username: ", user1.username));
    console.log(chalk.blue("Age: ", user1.age));
    console.log(chalk.blue("Email Id: ", user1.emailid));
  }
  //   More Methods
}

function clientLogic() {
  const fc = new FacadeReadingDB();
  fc.addToDb({ username: "Manoja", emailid: "manojad2004@gmail.com", age: 19 });
  fc.addToDb({
    username: "Vilas",
    emailid: "vilaspgowda1000@gmail.com",
    age: 19,
  });
  fc.addToDb({
    username: "Vilas",
    emailid: "vilaspgowda1000@gmail.com",
    age: 19,
  });
  fc.addToDb({
    username: "Aditya",
    emailid: "adityas2004@gmail.com",
    age: 19,
  });
  fc.readFromDB("Manoja");
  fc.readFromDB("Aditya");
}

function main() {
  console.log(chalk.yellow("Facade:"));
  //   The actual facade is very huge spaghetti code, turn to give simple neccessary functionality!
  //   Like ReactJS, NextJS, ExpressJS, etc.
  clientLogic();
}

export { main };
