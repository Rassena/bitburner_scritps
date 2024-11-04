/** @param {NS} ns */

export async function main(ns) {
  let stock_constants = ns.stock.getConstants()
  let products = ns.stock.getSymbols()

  for (let i=0;i<products.length;i++){
    let product_name = products[i]
    let product_volatility = ns.stock.getVolatility(product_name)
    let product_forecast = ns.stock.getForecast(product_name)
    let product_organisation = ns.stock.getOrganization(product_name)
    let player_position = ns.stock.getPosition(product_name)

    ns.tprint("")
    ns.tprint(product_name, ": ", product_organisation)
    ns.tprint("product_forecast", ": ", product_forecast)
    ns.tprint("product_volatility", ": ", product_volatility)
    ns.tprint("player_position", ": ", player_position)
  }
}