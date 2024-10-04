import { LoonyWallet } from 'loony-wallet';
import { ProcessHandler } from '../node';

(async () => {
  const node = new ProcessHandler();
  node.setArgs(process.argv);

  const wallet = new LoonyWallet();
  wallet.setOptions(node.options);

  wallet.generateKeypairFromMnemonic();
})();