"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class ConcNotifier {
    type = "SMS";
    send(msg) {
        console.log(chalk_1.default.red("Message of type:", this.type, ", is sent. The message is:", chalk_1.default.blue(msg)));
    }
}
class BaseNotifier {
    wrappee;
    constructor(wrappee) {
        this.wrappee = wrappee;
    }
    send(msg) {
        this.wrappee.send(msg);
    }
}
class FacebookNotifier extends BaseNotifier {
    type = "Facebook";
    constructor(wrappee) {
        super(wrappee);
    }
    send(msg) {
        super.send(msg);
        this.sendMsg(msg);
    }
    sendMsg(msg) {
        console.log(chalk_1.default.red("Message of type:", this.type, "is sent. The message is:", chalk_1.default.blue(msg)));
    }
}
class WhatsAppNotifier extends BaseNotifier {
    type = "WhatsApp";
    constructor(wrappee) {
        super(wrappee);
    }
    send(msg) {
        super.send(msg);
        this.sendMsg(msg);
    }
    sendMsg(msg) {
        console.log(chalk_1.default.red("Message of type:", this.type, "is sent. The message is:", chalk_1.default.blue(msg)));
    }
}
class DiscordNotifier extends BaseNotifier {
    type = "Discord";
    constructor(wrappee) {
        super(wrappee);
    }
    send(msg) {
        // You can also do this after, call the super class afterwards. Like reading.
        super.send(msg);
        this.sendMsg(msg);
    }
    sendMsg(msg) {
        console.log(chalk_1.default.red("Message of type:", this.type, "is sent. The message is:", chalk_1.default.blue(msg)));
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
    console.log(chalk_1.default.yellow("Decorator:"));
    clientLogic();
}
