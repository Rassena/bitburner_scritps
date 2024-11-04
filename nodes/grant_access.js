/** @param {NS} ns */
import {get_nodes} from "nodes/get_nodes.js";

export async function main(ns) {

  const targets = await get_nodes(ns)

  for (let i = 0; i < targets.length; i++) {
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(targets[i]);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(targets[i]);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(targets[i]);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(targets[i]);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(targets[i]);
    }
    if (!ns.getServer(targets[i]).hasAdminRights) {
      if (ns.getServer(targets[i]).openPortCount >= ns.getServer(targets[i]).numOpenPortsRequired) {
        ns.nuke(targets[i])
        ns.tprint("Hacked: ", targets[i])
      }
    }
  }
}