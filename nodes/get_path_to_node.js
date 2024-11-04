/** @param {NS} ns */

import { get_nodes } from "nodes/get_nodes.js";

export function has_backdoor(ns, host) {
  let server = ns.getServer(host)
  return server.backdoorInstalled
}


export function get_neighbours(ns) {
  let ignore = ns.getPurchasedServers()
  let nodes = get_nodes(ns)
  ignore.push("home")
  for (let i = 0; i < nodes.length; i++) {
    if (!ignore.includes(nodes[i])) {
      if (has_backdoor(ns, nodes[i])) {
        ns.tprint("(b) ", nodes[i], ": ", ns.scan(nodes[i]))
      }
      else {
        ns.tprint("    ", nodes[i], ": ", ns.scan(nodes[i]))
      }
    }
  }
}

export async function main(ns) {
  get_neighbours(ns)
}