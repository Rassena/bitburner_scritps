/** @param {NS} ns */

const SELL_THRESHOLD = 0.52

export async function auto_stock_sell(ns) {
  while (true) {
    await ns.stock.nextUpdate()
    let products = ns.stock.getSymbols()

    for (let i = 0; i < products.length; i++) {
      let player_position = ns.stock.getPosition(products[i])
      if (player_position[0] > 0) {
        if (ns.stock.getForecast(products[i]) < SELL_THRESHOLD) {
          ns.stock.getSaleGain(products[i], player_position[0], "Long")
          ns.stock.sellStock(products[i], player_position[0])
        }
      }
    }
  }
}

export async function main(ns) {
  await auto_stock_sell(ns)
}