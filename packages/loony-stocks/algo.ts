// OHLC (Open, High, Low, Close)
type TIMESTAMP = number;
type Open = number;
type High = number;
type Low = number;
type Close = number;
type TOHLC = [number, number, number, number, number, number, number]
type TC= [number, number]
type StocksData = TOHLC[];

const getClose = (data: number[][]) => {
  return data.map((x) => x[4])
}

export const simpleMovingAverage = (data: number[][], period: number) => {
  let count = 0;
  let fiveMinutes: TC[] = [];
  const groupOfFive: TC[][]= [];

  data.forEach((x) => {
    if (count === period) {
      groupOfFive.push(fiveMinutes)
      fiveMinutes = []
      count = 0
    }
    count += 1

    fiveMinutes.push([x[0], x[4]]);
  })

  const five: TC[] = []

  groupOfFive.forEach((gg) => {
    let t = 0
    let z = 0
    gg.forEach((x) => {
      t += x[1]
      z = x[0]
    })
    const m = t/period
    five.push([z, m]);
  })

  const res = five.map((x) => {
    return [new Date(x[0]).toLocaleString(), x[1]]
  })

  return res

}

// Function to calculate EMA (Exponential Moving Average)
export const exponentialMovingAverage = (stocksData: number[][], period: number) => {
  const k = 2 / (period + 1); // Smoothing factor
  let emaArray = [];
  let emaPrevious;

  const prices = getClose(stocksData);

  // First EMA is a simple moving average (SMA) over the initial period
  const sma = prices.reduce((acc, price) => acc + price, 0) / period;
  emaArray[period - 1] = sma;
  emaPrevious = sma;

  // Calculate the remaining EMA values
  for (let i = period; i < prices.length; i++) {
      const emaCurrent: number = (prices[i] * k) + (emaPrevious * (1 - k));
      emaArray[i] = emaCurrent;
      emaPrevious = emaCurrent;
  }

  return emaArray;
}

