/** @param {NS} ns */

export async function main(ns) {
  ns.tprint("corporation/corporation_step_5.js")
  let next_step = "corporation/corporation_step_6.js"

  let divisions = ns.corporation.getCorporation().divisions
  let cities = ns.enums.CityName

  let materials_to_buy = {
    "Real Estate": 27000,
    "Hardware": 125,
    "AI Cores": 75
  }

  for (let division_index in divisions) {
    for (let material in materials_to_buy) {
      for (let city in cities) {
        let material_data = ns.corporation.getMaterial(divisions[division_index], cities[city], material)
        while (material_data.stored < materials_to_buy[material]) {
          let buy = materials_to_buy[material] - material_data.stored
          let buy_cost = material_data.marketPrice * buy
          let funds = ns.corporation.getCorporation().funds

          if (funds >= buy_cost) { ns.corporation.bulkPurchase(divisions[division_index], cities[city], material, buy) }
          else {
            let buy_max = Math.floor(funds/material_data.marketPrice)
            ns.corporation.bulkPurchase(divisions[division_index], cities[city], material, buy_max) 
            await ns.corporation.nextUpdate()
          }
          material_data = ns.corporation.getMaterial(divisions[division_index], cities[city], material)
        }
      }
    }
  }

  if (ns.corporation.getInvestmentOffer().round == 1) {
    while (ns.corporation.getInvestmentOffer().funds < 145e9) {
      ns.print(ns.corporation.getInvestmentOffer().funds)
      await ns.corporation.nextUpdate()
    }
    ns.corporation.acceptInvestmentOffer()
  }

  ns.spawn(next_step)
}