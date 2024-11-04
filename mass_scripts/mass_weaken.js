/** @param {NS} ns */

import { get_admin_privillage } from "get_admin_privillage.js";

export async function main(ns) {
  let script_file = "simple_script/weaken.js"
  const ignore = ["home"]
  let targets = await get_admin_privillage(ns)
    for (let i = 0; i < ignore.length; i++) {
      if (targets.includes(ignore[i])) {
        targets.splice(targets.indexOf(ignore[i]))
      }
    }
  // ns.tprint(get_admin_privillage(ns))
  for (let i = 0; i < targets.length; i++) {
    ns.scp(script_file, targets[i])
    let threads = ns.getServer(targets[i]).maxRam / 2
    if (ns.getServer(targets[i]).maxRam / 2 > 0) {
      // ns.tprint(targets[i],": ", ns.getServerUsedRam(targets[i]), " from ", ns.getServer(targets[i]).maxRam)
      for (let t = 0; t < threads; t++) {
        ns.exec(script_file, targets[i], 1, targets[i])
      }
    }
  }
}