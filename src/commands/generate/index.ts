import { Command } from "@oclif/core";

export default class Generate extends Command {
  static description = "Generates new key pair.";

  static examples = [`$ ft generate`];

  async run(): Promise<void> {
    this.log(
      `Here is your new key pair. It will work on all EVM compatible blockchains.`
    );
  }
}
