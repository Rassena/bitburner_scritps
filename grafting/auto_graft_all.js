/** @param {NS} ns */

export async function main(ns) {
  while (ns.grafting.getGraftableAugmentations().length > 1) {
    await ns.grafting.waitForOngoingGrafting()
    let graftings = ns.grafting.getGraftableAugmentations()
    ns.grafting.graftAugmentation(graftings[0])
    ns.tprint(graftings[0])
  }
}