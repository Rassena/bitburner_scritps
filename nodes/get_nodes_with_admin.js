/** @param {NS} ns */

import { get_nodes } from "nodes/get_nodes.js";


export function get_nodes_with_admin(ns) {
  let admin_nodes = []
  let all_nodes = get_nodes(ns)
  for (let i = 0; i < all_nodes.length; i++) {
    if (ns.getServer(all_nodes[i]).hasAdminRights) {
      admin_nodes.push(all_nodes[i])
    }
  }
  return admin_nodes
}

export async function main(ns) {
  ns.tprint(get_nodes_with_admin(ns))
}