/** @param {NS} ns */

import { get_nodes_with_admin } from "nodes/get_nodes_with_admin.js";

const SCRIPT_FILE = "simple_script/attack.js"

export function mass_attack(ns,target){

  let ignore = ns.getPurchasedServers()
  ignore.push("home")

  const script_ram = ns.getScriptRam(SCRIPT_FILE, "home")
  let hosts = get_nodes_with_admin(ns)
  hosts = hosts.filter(host => !ignore.includes(host));
  ns.tprint(hosts)
  for (let i = 0; i < hosts.length; i++) {
    ns.scp(SCRIPT_FILE, hosts[i])
    let threads = (ns.getServer(hosts[i]).maxRam - ns.getServerUsedRam(hosts[i])) / script_ram
    if (threads >= 1) {
      for (let t = 0; t < threads; t++) {
        ns.exec(SCRIPT_FILE, hosts[i], 1, target)
      }
    }
  }
}

export async function main(ns) {
  mass_attack(ns,ns.args[0])
}