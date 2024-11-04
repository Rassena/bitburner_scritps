/** @param {NS} ns */

import { get_nodes_with_admin } from "nodes/get_nodes_with_admin.js";

const HACK_LEVEL_THRESHOLD = 0.5

export function get_hackable_nodes(ns) {
  let nodes_with_admin = get_nodes_with_admin(ns)
  let hackable_nodes = []
  let player_hack_level = ns.getPlayer().skills.hacking

  for (let i = 0; i < nodes_with_admin.length; i++) {
    let server_hack_level = ns.getServer(nodes_with_admin[i]).requiredHackingSkill
    if (server_hack_level <= player_hack_level * HACK_LEVEL_THRESHOLD) {
      hackable_nodes.push(nodes_with_admin[i])
    }
  }
  return hackable_nodes
}

export async function main(ns) {
  ns.tprint(get_hackable_nodes(ns))
}