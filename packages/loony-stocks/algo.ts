type TimestampClose = [number, number]

export const simpleMovingAverage = (data: number[][], points: number) => {
    const groupOf = 5;
  let count = 0;
  let fiveMinutes: TimestampClose[] = [];
  const groupOfFive: TimestampClose[][] = [];

  data.forEach((x) => {
    if (count === groupOf) {
      groupOfFive.push(fiveMinutes)
      fiveMinutes = []
      count = 0
    }
    count += 1

    fiveMinutes.push([x[0], x[4]]);
  })

  const five: TimestampClose[] = []

  groupOfFive.forEach((gg) => {
    let t = 0
    let z = 0
    gg.forEach((x) => {
      t += x[1]
      z = x[0]
    })
    const m = t/groupOf
    five.push([z, m]);
  })

  const res = five.map((x) => {
    return [new Date(x[0]).toLocaleString(), x[1]]
  })

  return res

}