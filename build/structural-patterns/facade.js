"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class FacadeReadingDB {
    dbConc;
    readFormat;
    constructor() {
        this.dbConc = new DataBaseConnection();
        this.readFormat = new ReadUserDeatils();
    }
    addToDb(jsonOb) {
        const user1 = this.dbConc.readFromDb(jsonOb.username);
        if (user1) {
            console.log(chalk_1.default.red("Username Already Exists: "));
            this.readFormat.readUser(user1);
        }
        else {
            this.dbConc.addUser(new UserDetails(jsonOb.username, jsonOb.age, jsonOb.emailid));
        }
    }
    readFromDB(username) {
        const user1 = this.dbConc.readFromDb(username);
        if (user1) {
            console.log(chalk_1.default.red("User Details: "));
            this.readFormat.readUser(user1);
        }
    }
}
class MongoDbFacadeDb extends FacadeReadingDB {
}
class UserDetails {
    username;
    age;
    emailid;
    addDetails;
    constructor(username, age, emailid, addDetails = []) {
        this.username = username;
        this.age = age;
        this.emailid = emailid;
        this.addDetails = addDetails;
    }
}
class DataBase {
    tableUser = [];
}
class DataBaseConnection {
    static db;
    //   This could be like real DB connection, like PSQL connection, instead of static DB.
    constructor() {
        if (!DataBaseConnection.db) {
            DataBaseConnection.db = new DataBase();
        }
    }
    readFromDb(username) {
        return DataBaseConnection.db.tableUser.find((val) => val.username === username);
    }
    addUser(newUser) {
        DataBaseConnection.db.tableUser.push(newUser);
    }
}
class ReadUserDeatils {
    readUser(user1) {
        console.log(chalk_1.default.blue("Username: ", user1.username));
        console.log(chalk_1.default.blue("Age: ", user1.age));
        console.log(chalk_1.default.blue("Email Id: ", user1.emailid));
    }
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
    console.log(chalk_1.default.yellow("Facade:"));
    //   The actual facade is very huge spaghetti code, turn to give simple neccessary functionality!
    //   Like ReactJS, NextJS, ExpressJS, etc.
    clientLogic();
}
