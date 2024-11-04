/** @param {NS} ns */

export async function main(ns) {
  ns.tprint("corporation/corporation_step_7.js")
  let next_step = "corporation/corporation_step_8.js"

  let divisions = ns.corporation.getCorporation().divisions
  let cities = ns.enums.CityName

  let upgrades = {
    "Smart Factories": 10,
    "Smart Storage": 10
  }

  for (let upgrade_name in upgrades) {
    while (ns.corporation.getUpgradeLevel(upgrade_name) < upgrades[upgrade_name]) {
      let funds = ns.corporation.getCorporation().funds
      if (funds >= ns.corporation.getUpgradeLevelCost(upgrade_name)) { ns.corporation.levelUpgrade(upgrade_name) }
      else {
        ns.print(upgrade_name, ": ", ns.corporation.getUpgradeLevelCost(upgrade_name), " -> ", funds)
        await ns.corporation.nextUpdate()
      }
    }
  }

  let finished = false
  while (!finished) {
    finished = true
    for (let division_index in divisions) {
      for (let city in cities) {
        if (ns.corporation.getWarehouse(divisions[division_index], cities[city]).level < 10) {
          finished = false
          ns.corporation.upgradeWarehouse(divisions[division_index], cities[city], 1)
        }
      }
    }
    await ns.corporation.nextUpdate()
  }

  ns.spawn(next_step)

}