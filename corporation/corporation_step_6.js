/** @param {NS} ns */

export async function main(ns) {
  ns.tprint("corporation/corporation_step_6.js")
  let next_step = "corporation/corporation_step_7.js"

  let cities = ns.enums.CityName
  let divisions = ns.corporation.getCorporation().divisions
  let positions = {
    "Operations": 2,
    "Engineer": 2,
    "Business": 2,
    "Management": 2,
    "Research & Development": 1,
    "Intern": 1,
  }

  for (let division_index in divisions) {
    for (let city in cities) {
      while (ns.corporation.getOffice(divisions[division_index], cities[city]).size < 10) {
        let funds = ns.corporation.getCorporation().funds
        if (ns.corporation.getOfficeSizeUpgradeCost(divisions[division_index], cities[city], 1) < funds) {
          ns.corporation.upgradeOfficeSize(divisions[division_index], cities[city], 1)
        }
        else { await ns.corporation.nextUpdate() }
      }
      while (ns.corporation.getOffice(divisions[division_index], cities[city]).numEmployees < 10) {
        ns.corporation.hireEmployee(divisions[division_index], cities[city])
      }
      for (let position in positions)
        ns.corporation.setAutoJobAssignment(divisions[division_index], cities[city], position, positions[position])
    }
  }

  ns.spawn(next_step)
} 