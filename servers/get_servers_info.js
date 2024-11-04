/** @param {NS} ns */
export async function main(ns) {

  let servers = ns.getPurchasedServers()
  if (servers) {
    for (let i = 0; i < servers.length; i++) {
      let server = ns.getServer(servers[i])
      ns.tprint(server.hostname)
      ns.tprint("ram: ", ns.formatRam(server.maxRam))
    }
  }

}