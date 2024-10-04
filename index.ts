/**
 * @loony_nodejs
 */
import { exponentialMovingAverage } from 'loony-stocks/algo.ts';
import jsonData from './.data/rba.json' with { type: "json" };

(async () => {
  let res = exponentialMovingAverage(jsonData.candles, 5)
  console.log(res)
})();
