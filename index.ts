/**
 * @loony_nodejs
 */
import { simpleMovingAverage } from 'loony-stocks/algo';
import jsonData from './.data/rba.json'

(async () => {
  let res = simpleMovingAverage(jsonData.candles, 6)
  console.log(res)
})();
