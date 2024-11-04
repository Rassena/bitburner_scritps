/** @param {NS} ns */

export async function main(ns) {
  ns.tprint("corporation/corporation_step_4.js")
  let next_step = "corporation/corporation_step_5.js"

  let divisions = ns.corporation.getCorporation().divisions
  let cities = ns.enums.CityName

  let upgrades = [
    "FocusWires",
    "Neural Accelerators",
    "Speech Processor Implants",
    "Nuoptimal Nootropic Injector Implants",
    "Smart Factories",
  ]

  for (let upgrade_index in upgrades) {
    while (ns.corporation.getUpgradeLevel(upgrades[upgrade_index]) < 2) {
      ns.corporation.levelUpgrade(upgrades[upgrade_index])
    }
  }

  let materials = [
    "Food",
    "Plants",
  ]

  for (let division_index in divisions) {
    for (let city in cities) {
      for (let material_index in materials) {
        ns.corporation.sellMaterial(divisions[division_index], cities[city], materials[material_index], "MAX", "MP")
      }
    }
  }

  ns.spawn(next_step)

}