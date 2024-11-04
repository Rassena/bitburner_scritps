/** @param {NS} ns */

export async function main(ns) {
  ns.tprint("corporation/corporation_step_8.js")
  let next_step = "corporation/corporation_step_9.js"

  let divisions = ns.corporation.getCorporation().divisions
  let cities = ns.enums.CityName

  let materials_to_buy = {
    "Real Estate": 146400,
    "Hardware": 2800,
    "AI Cores": 2520,
    "Robots": 96
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

  ns.spawn(next_step)
}