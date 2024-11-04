/** @param {NS} ns */

import { get_hackable_nodes } from "nodes/get_hackable_nodes.js";


export async function mass_smart_attack(ns){
  let hackable_nodes = get_hackable_nodes(ns)
  const HACKING_THRESHOLD = 0.5
  for (let i =0;i<hackable_nodes.length;i++){
    let player_hacking = ns.getPlayer().skills.hacking
    if (ns.getServer(hackable_nodes[i]).hackDifficulty<player_hacking*HACKING_THRESHOLD){
      ns.exec("servers/smart_attack.js","home",1,hackable_nodes[i])
    }
    await ns.sleep(500)
  }
}
export async function main(ns) {
  return await mass_smart_attack(ns)
}