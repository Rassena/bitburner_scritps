/** @param {NS} ns */

const BUDGET_MULTIPLIER = 1.0

export function upgrade_servers(ns) {
  let servers = ns.getPurchasedServers()
  for (let i = 0; i < servers.length; i++) {
    let ram = ns.getServer(servers[i]).maxRam * 2;
    let upgrade_cost = ns.getPurchasedServerUpgradeCost(servers[i], ram)
    if (upgrade_cost < ns.getPlayer().money * BUDGET_MULTIPLIER) {
      ns.upgradePurchasedServer(servers[i], ram)
      ns.print(" Upgraded ", servers[i], " to ", ns.formatRam(ram), " costs: ", ns.formatNumber(upgrade_cost))
    }
  }
}

export async function main(ns) {
  upgrade_servers(ns)
}