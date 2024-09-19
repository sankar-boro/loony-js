/**
 * @loony_nodejs
 */
import { ProcessHandler } from './node';
import { LoonyCl } from './packages/loony-cl/index';

(async () => {
  const node = new ProcessHandler();
  node.setArgs(process.argv);

  const Cl = new LoonyCl();
  Cl.setOptions(node.options);
  const res = Cl.run();
  console.log(res);
})();
