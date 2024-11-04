/** @param {NS} ns */

const SCRIPT_FILE = "simple_script/share.js"

export function mass_share(ns){
  const script_ram = ns.getScriptRam(SCRIPT_FILE, "home")
  let hosts = ns.getPurchasedServers()
  for (let i = 4; i < hosts.length; i++) {
    ns.scp(SCRIPT_FILE, hosts[i])
    let threads = (ns.getServer(hosts[i]).maxRam - ns.getServerUsedRam(hosts[i])) / script_ram
    if (threads >= 1) {
      for (let t = 0; t < threads; t++) {
        ns.exec(SCRIPT_FILE, hosts[i],Math.floor(threads))
      }
    }
  }
}

export async function main(ns) {
  mass_share(ns)
}