/** @param {NS} ns */
import { get_nodes } from "nodes/get_nodes.js";

export async function get_files(ns, file_suffix) {
  let targets = await get_nodes(ns)
  let result = []
  targets = targets.filter(item => !item.endsWith('home'));

  for (let i = 0; i < targets.length; i++) {
    let files = ns.ls(targets[i])
    let filteredfiles = []
    if (files.length > 0) {
      filteredfiles = files.filter(item => item.endsWith(file_suffix));
    }
    if (filteredfiles.length > 0) {
      result.push([targets[i], filteredfiles])
    }
  }
  return result
}

export async function main(ns) {
  let result = await get_files(ns, ns.args[0])
  for (let i =0; i< result.length;i++){
    ns.tprint(result[i][0], ": ", result[i][1])
  }
}