import {
  generateKeypairFromMnemonic as generateKeypairFromMnemonic__,
  createHash,
} from './src/generate';

type Options = {
  [key: string]: string,
}

class LoonyWallet {
  options: Options = {};

  setOptions(options: Options) {
    this.options = options;
  }

  generateKeypairFromMnemonic() {
    const name = this.options.name;
    const mnemonicName = createHash(name);
    generateKeypairFromMnemonic__(mnemonicName, "m/44'/501'/0'/0'", name);
  }
}

export { LoonyWallet };
