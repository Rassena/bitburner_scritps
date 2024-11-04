/** @param {NS} ns */

const SCRIPT_FILE = "simple_script/attack.js"
const THREADS_MULTIPLIER = 10
const SECOND = 100
const MINUTE = 60 * SECOND
const MIN_PROCESSES = 20
const MAX_PROCESSES = 300
const RESERVE_SMART_ATTACK = 1

export async function auto_mass_attack(ns,target) {

  const SCRIPT_RAM = ns.getScriptRam(SCRIPT_FILE, "home")

  while (true) {
    let hosts = ns.getPurchasedServers()
    for (let i = RESERVE_SMART_ATTACK; i < hosts.length; i++) {
      ns.scp(SCRIPT_FILE, hosts[i])
      let thread = 1
      let host_max_ram = ns.getServer(hosts[i]).maxRam
      let host_used_ram = ns.getServerUsedRam(hosts[i])
      let possible_scripts = (host_max_ram - host_used_ram) / SCRIPT_RAM
      if (possible_scripts > 100) {
        while (((possible_scripts / thread) < MIN_PROCESSES) || ((possible_scripts / thread) > MAX_PROCESSES)) {
          if ((possible_scripts / thread) < MIN_PROCESSES) {
            thread = thread / THREADS_MULTIPLIER
          }
          else {
            if ((possible_scripts / thread) > MAX_PROCESSES) {
              thread = thread * THREADS_MULTIPLIER
            }
          }
        }
      }
      let processes = possible_scripts/thread
      if (processes >= 1) {
        for (let t = 0; t < processes; t++) {
          ns.exec(SCRIPT_FILE, hosts[i], thread, target)
        }
      }
    }
    await ns.sleep(MINUTE)
  }
}

export async function main(ns) {
  ns.disableLog("sleep")
  await auto_mass_attack(ns,ns.args[0])
}