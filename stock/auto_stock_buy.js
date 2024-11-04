/** @param {NS} ns */

const BUY_COST_THRESHOLD = 0.75
const BUY_FORECAST_THRESHOLD = 0.55

export async function auto_stock_buy(ns) {
  while (true) {
    await ns.stock.nextUpdate()
    let products = ns.stock.getSymbols()
    for (let i = 0; i < products.length; i++) {
      let player_position = ns.stock.getPosition(products[i])
      if (player_position[0] == 0) {
        if (ns.stock.getForecast(products[i]) > BUY_FORECAST_THRESHOLD) {
          ns.stock.getSaleGain(products[i], player_position[0], "Long")
          let to_buy = ns.stock.getMaxShares(products[i])
          let cost = ns.stock.getPurchaseCost(products[i],to_buy,"Long")
          if (cost <= ns.getPlayer().money * BUY_COST_THRESHOLD){
          ns.stock.buyStock(products[i], to_buy)
          }
        }
      }
    }
  }
}

export async function main(ns) {
  await auto_stock_buy(ns)
}