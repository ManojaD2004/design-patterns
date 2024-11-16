"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const chalk_1 = __importDefault(require("chalk"));
class TV {
    isOn;
    chaNo;
    volNo;
    maxChans = 3;
    constructor() {
        this.isOn = false;
        this.chaNo = 1;
        this.volNo = 1;
    }
    getChannel() {
        return this.chaNo;
    }
    setChannel(chaNo) {
        if (chaNo > this.maxChans) {
            this.chaNo = 1;
            return;
        }
        this.chaNo = chaNo;
    }
    getVolume() {
        return this.volNo;
    }
    setVolume(volNo) {
        if (volNo > 100 || volNo < 0) {
            return;
        }
        this.volNo = volNo;
    }
    turnOnOff() {
        this.isOn = !this.isOn;
    }
    isTurnedOn() {
        return this.isOn;
    }
}
class Radio {
    isOn;
    chaNo;
    volNo;
    maxChans = 5;
    constructor() {
        this.isOn = false;
        this.chaNo = 1;
        this.volNo = 1;
    }
    getChannel() {
        return this.chaNo;
    }
    setChannel(chaNo) {
        if (chaNo > this.maxChans) {
            this.chaNo = 1;
            return;
        }
        this.chaNo = chaNo;
    }
    getVolume() {
        return this.volNo;
    }
    setVolume(volNo) {
        if (volNo > 100 || volNo < 0) {
            return;
        }
        this.volNo = volNo;
    }
    turnOnOff() {
        this.isOn = !this.isOn;
    }
    isTurnedOn() {
        return this.isOn;
    }
}
class RemoteAbstraction {
    device;
    constructor(device) {
        this.device = device;
    }
    turnOnOff() {
        this.device.turnOnOff();
        return this.device.isTurnedOn();
    }
    volumeUp() {
        this.device.setVolume(this.device.getVolume() + 1);
    }
    volumeDown() {
        this.device.setVolume(this.device.getVolume() - 1);
    }
    channelUp() {
        this.device.setChannel(this.device.getChannel() + 1);
    }
    channelDown() {
        this.device.setChannel(this.device.getChannel() - 1);
    }
    showVolume() {
        return this.device.getVolume();
    }
    showChannel() {
        return this.device.getChannel();
    }
}
class AdvanceRemote extends RemoteAbstraction {
    device;
    volState = 0;
    constructor(device) {
        super(device);
        this.device = device;
    }
    mute() {
        this.volState = this.device.getVolume();
        this.device.setVolume(0);
    }
    unMute() {
        this.device.setVolume(this.volState);
    }
}
function clientLogic(device) {
    const remote = new AdvanceRemote(device);
    console.log(chalk_1.default.blue(`Device in channel ${remote.showChannel()}, and volume ${remote.showVolume()} going up now!`));
    for (let i = 0; i < 6; i++) {
        remote.channelUp();
        remote.volumeUp();
        remote.volumeUp();
        remote.volumeUp();
        remote.volumeDown();
        console.log(chalk_1.default.blue(`Device in channel ${remote.showChannel()}, and volume ${remote.showVolume()} going up now!`));
    }
    remote.mute();
    console.log(chalk_1.default.red(`Device is unmuted, volume is ${remote.showVolume()}!`));
    remote.unMute();
    console.log(chalk_1.default.red(`Device is muted, volume is ${remote.showVolume()}!`));
}
function main() {
    console.log(chalk_1.default.yellow("Bridge:"));
    const tvDevice = new TV();
    const radio = new Radio();
    console.log(chalk_1.default.magenta("TV device connected to Remote."));
    clientLogic(tvDevice);
    console.log(chalk_1.default.magenta("Radio device connected to Remote."));
    clientLogic(radio);
}
