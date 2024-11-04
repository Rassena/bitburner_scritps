/** @param {NS} ns */
export async function main(ns) {
  ns.tprint("corporation/corporation_step_3.js")
  let next_step = "corporation/corporation_step_4.js"

  let divisions = ns.corporation.getCorporation().divisions
  let cities = ns.enums.CityName

  for (let division_index in divisions) {

    if (ns.corporation.getHireAdVertCount(divisions[division_index]) < 1) {
      ns.corporation.hireAdVert(divisions[division_index])
    }
    for (let city in cities) {
      ns.corporation.getWarehouse(divisions[division_index], cities[city]).level
      while (ns.corporation.getWarehouse(divisions[division_index], cities[city]).level < 3) {
        ns.corporation.upgradeWarehouse(divisions[division_index], cities[city], 1)
      }
    }
  }

  ns.spawn(next_step)

}