/** @param {NS} ns */

export async function main(ns) {
  expand_divisions(ns)
}

export function expand_divisions(ns) {

  let cities = ns.enums.CityName
  let division_to_expand = ns.corporation.getCorporation().divisions

  if (ns.corporation.hasCorporation()) {
    for (let division_index in division_to_expand) {
      for (let city in cities) {
        if (!ns.corporation.getDivision(division_to_expand[division_index]).cities.includes(cities[city])) {
          ns.corporation.expandCity(division_to_expand[division_index], cities[city])
        }
        if (!ns.corporation.hasWarehouse(division_to_expand[division_index], cities[city])) {
          ns.corporation.purchaseWarehouse(division_to_expand[division_index], cities[city])
        }
      }
    }
  }
}