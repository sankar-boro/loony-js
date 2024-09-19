type Options = {
  [key: string]: string; // This allows dynamic string keys with any type of value
}

class ProcessHandler {
  arguments: string[] = [];
  options: Options = {};

  setArgs(args: string[]) {
    this.arguments = args;
    this.processCommands();
  }

  processCommands() {
    const args = this.arguments.slice(2); // Slice to remove 'node' and 'script' path

    let options: Options = {};

    for (let i = 0; i < args.length; i++) {
      if (args[i].startsWith('--')) {
        const key = args[i].substring(2); // remove the '--'
        const value = args[i + 1]; // get the next value
        options[key] = value;
        i++; // skip the next value since we have already processed it
      }
    }
    this.options = options;
  }
}

export { ProcessHandler };
