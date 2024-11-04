/** @param {NS} ns */

import { get_nodes } from "nodes/get_nodes.js";

export function get_contracts(ns) {
  const targets = get_nodes(ns)
  let filteredfiles = []
  let contracts = []
  for (let i = 0; i < targets.length; i++) {
    filteredfiles = ns.ls(targets[i]).filter(item => item.endsWith('.cct'));
    if (filteredfiles.length > 0) {
      for (let j = 0; j < filteredfiles.length; j++) {
        contracts.push([targets[i], filteredfiles[j], ns.codingcontract.getData(filteredfiles[j], targets[i]), ns.codingcontract.getContractType(filteredfiles[j], targets[i])])
        // ns.tprint(ns.codingcontract.getDescription(filteredfiles[j], targets[i]))
      }
    }
  }
  return contracts
}


export async function main(ns) {
  let result = get_contracts(ns)
  for (let i = 0; i < result.length; i++) {
    ns.tprint(result[i][0], ": ", result[i][3], result[i][2])
  }
}