/** @param {NS} ns */
import { get_nodes } from "nodes/get_nodes.js";

const wanted = [
  "hostname",
  // "hasAdminRights",
  "organizationName",
  // "backdoorInstalled",
  "hackDifficulty",
  "minDifficulty",
  "moneyAvailable",
  "moneyMax",
  "requiredHackingSkill",
  "serverGrowth"
]

const MIN_GROWTH = 0
const MIN_HACKING = 1
const MIN_MAX_MONEY = 1e10
const MIN_AVAILABLE_MONEY = 1
const MAX_HACKING_MULTIPLIER = 0.9

export function requirements_meet(ns, server_info) {
  let player = ns.getPlayer()
  if (
    server_info.serverGrowth >= MIN_GROWTH &&
    server_info.requiredHackingSkill <= player.skills.hacking * MAX_HACKING_MULTIPLIER &&
    server_info.requiredHackingSkill >= MIN_HACKING &&
    server_info.moneyMax >= MIN_MAX_MONEY &&
    server_info.moneyAvailable >= MIN_AVAILABLE_MONEY
  ) {
    return true
  }
  return false
}


export async function get_node_info(ns, name) {
  let server_info = ns.getServer(name)
  if (requirements_meet(ns, server_info)) {
    for (const [key, value] of Object.entries(server_info)) {
      if (wanted.includes(key)) {
        ns.tprint(key, ": ", value);
      }
    }
    ns.tprint("")
  }
}


export function get_node_port(ns, node){
  let nodes = get_nodes(ns)
  let node_index = nodes.indexOf(node)+1
  return node_index
}

export function get_nodes_info(ns) {
  let nodes = get_nodes(ns)
  for (let i = 0; i < nodes.length; i++) {
    get_node_info(ns, nodes[i])
  }
}

export async function main(ns) {
  ns.tprint(get_nodes_info(ns))
}