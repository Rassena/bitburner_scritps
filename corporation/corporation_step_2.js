/** @param {NS} ns */

export async function main(ns) {
  ns.tprint("corporation/corporation_step_2.js")
  let next_step = "corporation/corporation_step_3.js"

  let cities = ns.enums.CityName
  let divisions = ns.corporation.getCorporation().divisions
  let positions = {
    "Operations": 1,
    "Engineer": 1,
    "Business": 1
  }

  for (let division_index in divisions) {
    for (let city in cities) {
      ns.corporation.setSmartSupply(divisions[division_index], cities[city], true)
      while (ns.corporation.getOffice(divisions[division_index], cities[city]).numEmployees < 3) {
        ns.corporation.hireEmployee(divisions[division_index], cities[city])
      }
      for (let position in positions)
        ns.corporation.setAutoJobAssignment(divisions[division_index], cities[city], position, positions[position])
    }
  }

  ns.spawn(next_step)
} 