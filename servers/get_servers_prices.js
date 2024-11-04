/** @param {NS} ns */

export async function main(ns) {

  let servers = ns.getPurchasedServers()
  const MAX = 2 ** 20;
  let ram = 2 ** 1;

  while (ram <= MAX) {
    ns.tprint("A purchased server with ", ns.formatRam(ram), " (", ram, ")",
      " costs ", ns.formatNumber(ns.getPurchasedServerCost(ram)));
    if (servers) {
      for (let i = 0; i < servers.length; i++) {
        if (ns.getServerMaxRam(servers[i]) < ram)
          ns.tprint(" Upgrade ", servers[i], " to ", ns.formatRam(ram),
            " costs: ", ns.formatNumber(ns.getPurchasedServerUpgradeCost(servers[i], ram)))
      }
    }
    ram = ram * 2;
  }

}