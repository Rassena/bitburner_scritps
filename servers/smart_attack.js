/** @param {NS} ns */

import { get_nodes_with_admin } from "nodes/get_nodes_with_admin.js";

const SCRIPT_WEAKEN = "simple_script/weaken.js"
const SCRIPT_GROW = "simple_script/grow.js"
const SCRIPT_HACK = "simple_script/simple_attack.js"
const SECOND = 1000

const PART_TO_HACK = 0.5
const MIN_TIME_WAIT = 0.2 * SECOND

const TIME_BUFFOR = 10
const MONEY_BUFFOR = 0.3
const SECURITY_BUFFOR = 0.3

export async function main(ns) {
  ns.disableLog("sleep")
  ns.disableLog("scp")
  ns.disableLog("exec")
  ns.disableLog("scan")
  ns.disableLog("getServerMaxRam")
  ns.disableLog("getServerUsedRam")
  ns.disableLog("getServerMinSecurityLevel")
  ns.disableLog("getServerSecurityLevel")
  ns.disableLog("getServerMoneyAvailable")
  ns.disableLog("getServerMaxMoney")

  const target = ns.args[0]
  let part_to_hack = PART_TO_HACK
  if (ns.args[1]) { part_to_hack = ns.args[1] }
  await smart_attack(ns, target, part_to_hack)
}

export async function attack_target(ns, target, part_to_hack = PART_TO_HACK) {

  let action = action_decide(ns, target, part_to_hack)

  let weaken_time = ns.getWeakenTime(target)
  let grow_time = ns.getGrowTime(target)
  let hack_time = ns.getHackTime(target)

  let host = action[3]
  let threads = new Map()

  threads = {
    "weaken": action[0],
    "grow": action[1],
    "hack": action[2]
  }

  let times = {
    "weaken": weaken_time,
    "grow": grow_time,
    "hack": hack_time
  }

  const sortedKeys = Object.keys(times).sort((a, b) => times[b] - times[a]);

  let max_time_lenght = 0

  if (threads[sortedKeys[0]] > 0) { max_time_lenght = times[sortedKeys[0]] }
  else {
    if (threads[sortedKeys[1]] > 0) { max_time_lenght = times[sortedKeys[1]] }
    else {
      if (threads[sortedKeys[2]] > 0) { max_time_lenght = times[sortedKeys[2]] }
      else { max_time_lenght = times[sortedKeys[0]] }
    }
  }

  let delay_hack = max_time_lenght - times["hack"]
  let delay_grow = (max_time_lenght - times["grow"]) + TIME_BUFFOR
  let delay_weaken = (max_time_lenght - times["weaken"]) + 2 * TIME_BUFFOR

  ns.print("delay_hack: ", delay_hack)
  ns.print("hack: ", times["hack"])
  ns.print("delay_grow: ", delay_grow)
  ns.print("grow: ", times["grow"])
  ns.print("delay_weaken: ", delay_weaken)
  ns.print("weaken: ", times["weaken"])

  if (threads["hack"] > 0) { hack_target(ns, target, host, threads["hack"], delay_hack) }
  if (threads["grow"] > 0) { grow_target(ns, target, host, threads["grow"], delay_grow) }
  if (threads["weaken"] > 0) { weaken_target(ns, target, host, threads["weaken"], delay_weaken) }

  let sleep_time = max_time_lenght

  if (threads["hack"] == 0) {
    if (threads["grow"] == 0 && threads["weaken"] == 0) { sleep_time = MIN_TIME_WAIT }
    else { sleep_time = max_time_lenght + 2 * TIME_BUFFOR }
  }
  else {
    if (max_time_lenght / 2 <= MIN_TIME_WAIT) { sleep_time = MIN_TIME_WAIT }
    else { for (let i = 1; sleep_time > MIN_TIME_WAIT; i++) { sleep_time = max_time_lenght / i } }
  }

  ns.print("sleep_time: ", sleep_time)
  ns.print("thread: ", threads)
  ns.print("")
  await ns.sleep(Math.ceil(sleep_time))
}

export async function smart_attack(ns, target, part_to_hack) {
  while (true) { await attack_target(ns, target, part_to_hack) }
}

function to_grow(ns, target, host) {

  let free_ram = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)))

  let ram_script_weaken = ns.getScriptRam(SCRIPT_WEAKEN)
  let ram_script_grow = ns.getScriptRam(SCRIPT_GROW)

  let security_wanted = ns.getServerMinSecurityLevel(target)
  let max_money = ns.getServerMaxMoney(target)


  let current_security = ns.getServerSecurityLevel(target)
  let current_money = ns.getServerMoneyAvailable(target)

  let grow_threads = calculate_growth_threads(ns, target, max_money, current_money)
  let grow_security = ns.growthAnalyzeSecurity(grow_threads)

  let weaken_threads = calculate_weaken_threads(ns, security_wanted, current_security + grow_security)

  let weaken_ram = weaken_threads * ram_script_weaken
  let grow_ram = grow_threads * ram_script_grow

  while (weaken_ram + grow_ram > free_ram) {
    grow_threads = grow_threads - 1
    grow_security = ns.growthAnalyzeSecurity(grow_threads)

    weaken_threads = calculate_weaken_threads(ns, security_wanted, current_security + grow_security)

    weaken_ram = weaken_threads * ram_script_weaken
    grow_ram = grow_threads * ram_script_grow
  }
  return [weaken_threads, grow_threads, 0, host]
}

function action_decide(ns, target, part_to_hack) {

  let ram_script_weaken = ns.getScriptRam(SCRIPT_WEAKEN)
  let ram_script_grow = ns.getScriptRam(SCRIPT_GROW)
  let ram_script_hack = ns.getScriptRam(SCRIPT_HACK)

  let security_wanted = ns.getServerMinSecurityLevel(target)
  let max_money = ns.getServerMaxMoney(target)

  let free_rams = []
  let hosts = ns.getPurchasedServers()
  // hosts.push("home")

  for (let i = 0; i < hosts.length; i++) {
    free_rams[i] = Math.floor((ns.getServerMaxRam(hosts[i]) - ns.getServerUsedRam(hosts[i])))
  }

  let current_money = ns.getServerMoneyAvailable(target)
  let current_security = ns.getServerSecurityLevel(target)

  let host_index = free_rams.indexOf(Math.max(...free_rams))
  if (current_money < max_money - (max_money * MONEY_BUFFOR) || current_security > security_wanted + (security_wanted * SECURITY_BUFFOR)) { return to_grow(ns, target, hosts[host_index]) }

  let hack_money_part = ns.hackAnalyze(target)
  let hack_threads = Math.ceil(ns.hackAnalyzeThreads(target, max_money * part_to_hack))
  let hack_money = (hack_money_part * hack_threads) * max_money
  let hack_security = ns.hackAnalyzeSecurity(hack_threads, target)

  let grow_threads = calculate_growth_threads(ns, target, max_money, current_money - hack_money)
  let grow_security = ns.growthAnalyzeSecurity(grow_threads)

  let weaken_threads = calculate_weaken_threads(ns, security_wanted, current_security + grow_security + hack_security)

  let weaken_ram = weaken_threads * ram_script_weaken
  let grow_ram = grow_threads * ram_script_grow
  let hack_ram = hack_threads * ram_script_hack

  if (weaken_ram + grow_ram + hack_ram >= free_rams[host_index]) { return [0, 0, 0, 0] }

  return [weaken_threads, grow_threads, hack_threads, hosts[host_index]]
}

function calculate_weaken_threads(ns, wanted, current) {
  let threads = 1
  while (current - wanted > ns.weakenAnalyze(threads)) { threads = threads + 1 }
  return Math.ceil(threads)
}

function calculate_growth_threads(ns, target, wanted, current) {
  let multiplier = (wanted / (current + 1))
  if (multiplier <= 1) { return 0 }
  return Math.ceil(ns.growthAnalyze(target, multiplier))
}

async function grow_target(ns, target, host, threads, delay) {
  ns.scp(SCRIPT_GROW, host)
  let target_list = get_nodes_with_admin(ns)
  let target_port_index = target_list.indexOf(target) + 1
  let stock_influence = ns.peek(target_port_index)
  await ns.exec(SCRIPT_GROW, host, Math.ceil(threads), target, Math.floor(delay), stock_influence)
  return 1
}

async function weaken_target(ns, target, host, threads, delay) {
  ns.scp(SCRIPT_WEAKEN, host)
  let target_list = get_nodes_with_admin(ns)
  let target_port_index = target_list.indexOf(target) + 1
  let stock_influence = ns.peek(target_port_index)
  await ns.exec(SCRIPT_WEAKEN, host, Math.ceil(threads), target, Math.floor(delay), stock_influence)
  return 1
}

async function hack_target(ns, target, host, threads, delay) {
  ns.scp(SCRIPT_HACK, host)
  let target_list = get_nodes_with_admin(ns)
  let target_port_index = target_list.indexOf(target) + 1
  let stock_influence = ns.peek(target_port_index)
  await ns.exec(SCRIPT_HACK, host, Math.floor(threads), target, Math.floor(delay), stock_influence)
  return 1
}