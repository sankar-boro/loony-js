/**
 * @loony_nodejs
 */
import { ProcessHandler } from "./node.ts";
import { LoonyCl } from "./packages/loony-cl/index.ts";
import process from "node:process";

(() => {
  const node = new ProcessHandler();
  node.setArgs(process.argv);

  const Cl = new LoonyCl();
  Cl.setOptions(node.options);
  const res = Cl.run();
  console.log(res);
})();
