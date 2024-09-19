### Stocks and Trading Market

### Usage

```js
import { sharesBooked, calculateProfitAndLoss } from 'loony-stocks';
function main() {
  const amount = 1000;
  const buyingPrice = 10;
  const sellingPrice = 15;
  const totalShares = sharesBooked(amount, buyingPrice);
  const res = calculateProfitAndLoss(sellingPrice, buyingPrice, totalShares);
  console.log('Amount:', amount);
  console.log('Buying Price:', buyingPrice);
  console.log('Selling Price:', sellingPrice);
  console.log('Shares:', totalShares);
  console.log('P/L:', res);
}
main();
```
