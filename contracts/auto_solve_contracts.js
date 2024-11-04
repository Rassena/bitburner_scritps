/** @param {NS} ns */
import {solve_contracts} from "contracts/solve_contracts.js"

const SECOND = 1000
const MINUTE = 60 * SECOND

export async function auto_solve_contracts(ns){
  ns.disableLog("sleep")
  while( true){
    await solve_contracts(ns)
    await ns.sleep(MINUTE)
  }
}

export async function main(ns) {
  await auto_solve_contracts(ns)
}