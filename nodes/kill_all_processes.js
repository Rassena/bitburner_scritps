/** @param {NS} ns */
import { get_nodes_with_admin } from "nodes/get_nodes_with_admin.js";


export function kill_all_procesesses(ns, host) {
  return(ns.killall(host))
}

export async function main(ns) {
  let servers_to_clean = get_nodes_with_admin(ns)
  for (let i = 0; i < servers_to_clean.length; i++) {
    kill_all_procesesses(ns, servers_to_clean[i])
  }
}