/** @param {NS} ns */


export async function purchase_server(ns,ram){
  let name = ""
  let servers = ns.getPurchasedServers()
  if (!servers) {servers = []}
  if (servers.length >= ns.getPurchasedServerLimit()) {
    ns.tprint("Max servers reachead")
    return 0
  }
  if (ns.getPurchasedServerCost(ram) > ns.getPlayer().money) {
    ns.tprint("Too expensive! need: ", ns.getPurchasedServerCost(ram))
    return 0
  }

  if (servers.length < 10) { name = "Server-0" + servers.length }
  else { name = "Server-" + servers.length }
  ns.tprint(ns.purchaseServer(name,ram))
}




export async function main(ns) {
  ns.tprint(purchase_server(ns,ns.args[0]))
}