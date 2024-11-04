/** @param {NS} ns */

export async function main(ns) {
  const BUDGET_THRESHOLD = 0.75
  ns.disableLog("sleep")
  const SECOND = 1000
  const MINUTE = 60 * SECOND

  const MAX_NODE_COST = 1e9


  while (true) {

    if (ns.hacknet.getPurchaseNodeCost() < ns.getPlayer().money * BUDGET_THRESHOLD &&
     ns.hacknet.getPurchaseNodeCost()< MAX_NODE_COST) {
      ns.hacknet.purchaseNode()
    }

    let hacknets = ns.hacknet.numNodes()
    for (let i = 0; i < hacknets; i++) {
      if (ns.hacknet.getLevelUpgradeCost(i) < ns.getPlayer().money * BUDGET_THRESHOLD) {
        ns.hacknet.upgradeLevel(i)
      }
      if (ns.hacknet.getRamUpgradeCost(i) < ns.getPlayer().money * BUDGET_THRESHOLD) {
        ns.hacknet.upgradeRam(i)
      }
      if (ns.hacknet.getCoreUpgradeCost(i) < ns.getPlayer().money * BUDGET_THRESHOLD) {
        ns.hacknet.upgradeCore(i)
      }
      await ns.sleep(SECOND/10)
    }
  }

}