/** @param {NS} ns */

import { upgrade_servers } from "servers/upgrade_servers.js"
import { purchase_server } from "servers/purchase_server.js"

const BUDGET_MULTIPLIER = 1.0
const MIN_RAM = 2 ** 3

const SECOND = 1000
const MINUTE = 60 * SECOND

export async function buy_servers(ns, max_servers = 0) {
  ns.disableLog("sleep")
  if (max_servers == 0) { max_servers = ns.getPurchasedServerLimit() }
  while (ns.getPurchasedServers().length < max_servers) {
    let purchase_cost = ns.getPurchasedServerCost(MIN_RAM)
    if (purchase_cost < ns.getPlayer().money * BUDGET_MULTIPLIER) { await purchase_server(ns, MIN_RAM) }
    else { await ns.sleep(10 * SECOND) }
  }

}

export async function main(ns) {

  await buy_servers(ns, ns.args[0])
  while (true) {
    upgrade_servers(ns)
    await ns.sleep(10 * SECOND)
  }
}