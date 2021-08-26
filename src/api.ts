// @ts-ignore
import random from "lodash/random";
// @ts-ignore
import faker from "faker";
import { Message } from "./models";

export default class MessageGenerator {
  messageCallback: (message: any) => {};
  stopGeneration: boolean;
  constructor(options: any) {
    this.messageCallback = options.messageCallback;
    this.stopGeneration = false;
  }

  stop() {
    this.stopGeneration = true;
  }

  start() {
    this.stopGeneration = false;
    this.generate();
  }

  isStarted() {
    return !this.stopGeneration;
  }

  /**
   * priority from 1 to 3, 1 = error, 2 = warning, 3 = info
   * */
  generate() {
    if (this.stopGeneration) {
      return;
    }
    const message = faker.lorem.sentence();
    const priority = random(1, 3);
    const nextInMS = random(500, 3000);
    this.messageCallback({
      message,
      priority,
    });
    setTimeout(() => {
      this.generate();
    }, nextInMS);
  }
}
