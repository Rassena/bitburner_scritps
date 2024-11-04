/** @param {NS} ns */

import { get_hack_augmentations } from "grafting/data_grafting.js";

export async function auto_graft_augmentations(ns) {
  while (ns.grafting.getGraftableAugmentations().length > 0) {
    await ns.grafting.waitForOngoingGrafting()
    let graftable = ns.grafting.getGraftableAugmentations()
    let hack_grafts = get_hack_augmentations()
    for (let i = 0; i < hack_grafts.length; i++) {
      if (graftable.includes(hack_grafts[i])) {
        let hack_index = graftable.indexOf(hack_grafts[i])
        if (ns.getPlayer().money >= ns.grafting.getAugmentationGraftPrice(graftable[hack_index])) {
          ns.grafting.graftAugmentation(graftable[hack_index])
          ns.print(graftable[hack_index])
        }
      }
    }
  }
  return 0
}

export async function main(ns) {
  await auto_graft_augmentations(ns)
}