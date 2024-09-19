function calculateProfitAndLoss(sellingPrice: number, purchasedPrice: number, quantityOfShares: number) {
  return (sellingPrice - purchasedPrice) * quantityOfShares;
}

function sharesBooked(priceYouHave: number, buyingPrice: number) {
  return priceYouHave / buyingPrice;
}

export { calculateProfitAndLoss, sharesBooked };
