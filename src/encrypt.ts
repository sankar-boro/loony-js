import { ProcessHandler } from '../node';
import { LoonyCl } from 'loony-cl';

(async () => {
  const node = new ProcessHandler();
  node.setArgs(process.argv);

  const Cl = new LoonyCl();
  Cl.setOptions(node.options);
  const res = Cl.run();
  console.log(res);
})();