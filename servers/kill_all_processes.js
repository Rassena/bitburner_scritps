/** @param {NS} ns */

export function kill_all_procesesses(ns, host) {
  return(ns.killall(host))
}

export async function main(ns) {
  let servers_to_clean = ns.getPurchasedServers()
  for (let i = 0; i < servers_to_clean.length; i++) {
    kill_all_procesesses(ns, servers_to_clean[i])
  }
}