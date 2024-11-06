import chalk from "chalk";

interface Device {
  getChannel(): number;
  setChannel(chaNo: number): void;
  getVolume(): number;
  setVolume(volNo: number): void;
  turnOnOff(): void;
  isTurnedOn(): boolean;
}

class TV implements Device {
  private isOn: boolean;
  private chaNo: number;
  private volNo: number;
  private maxChans: number = 3;
  constructor() {
    this.isOn = false;
    this.chaNo = 1;
    this.volNo = 1;
  }
  getChannel(): number {
    return this.chaNo;
  }
  setChannel(chaNo: number): void {
    if (chaNo > this.maxChans) {
      this.chaNo = 1;
      return;
    }
    this.chaNo = chaNo;
  }
  getVolume(): number {
    return this.volNo;
  }
  setVolume(volNo: number): void {
    if (volNo > 100 || volNo < 0) {
      return;
    }
    this.volNo = volNo;
  }
  turnOnOff(): void {
    this.isOn = !this.isOn;
  }
  isTurnedOn(): boolean {
    return this.isOn;
  }
}

class Radio implements Device {
  private isOn: boolean;
  private chaNo: number;
  private volNo: number;
  private maxChans: number = 5;
  constructor() {
    this.isOn = false;
    this.chaNo = 1;
    this.volNo = 1;
  }
  getChannel(): number {
    return this.chaNo;
  }
  setChannel(chaNo: number): void {
    if (chaNo > this.maxChans) {
      this.chaNo = 1;
      return;
    }
    this.chaNo = chaNo;
  }
  getVolume(): number {
    return this.volNo;
  }
  setVolume(volNo: number): void {
    if (volNo > 100 || volNo < 0) {
      return;
    }
    this.volNo = volNo;
  }
  turnOnOff(): void {
    this.isOn = !this.isOn;
  }
  isTurnedOn(): boolean {
    return this.isOn;
  }
}

class RemoteAbstraction {
  constructor(protected device: Device) {}
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
  protected volState: number = 0;
  constructor(protected device: Device) {
    super(device);
  }
  mute() {
    this.volState = this.device.getVolume();
    this.device.setVolume(0);
  }
  unMute() {
    this.device.setVolume(this.volState);
  }
}

function clientLogic(device: Device) {
  const remote = new AdvanceRemote(device);
  console.log(
    chalk.blue(
      `Device in channel ${remote.showChannel()}, and volume ${remote.showVolume()} going up now!`
    )
  );
  for (let i = 0; i < 6; i++) {
    remote.channelUp();
    remote.volumeUp();
    remote.volumeUp();
    remote.volumeUp();
    remote.volumeDown();
    console.log(
      chalk.blue(
        `Device in channel ${remote.showChannel()}, and volume ${remote.showVolume()} going up now!`
      )
    );
  }
  remote.mute();
  console.log(
    chalk.red(`Device is unmuted, volume is ${remote.showVolume()}!`)
  );
  remote.unMute();
  console.log(chalk.red(`Device is muted, volume is ${remote.showVolume()}!`));
}

function main() {
  console.log(chalk.yellow("Bridge:"));
  const tvDevice = new TV();
  const radio = new Radio();
  console.log(chalk.magenta("TV device connected to Remote."));
  clientLogic(tvDevice);
  console.log(chalk.magenta("Radio device connected to Remote."));
  clientLogic(radio);
}

export { main };
