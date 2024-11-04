/** @param {NS} ns */

import { get_files } from "nodes/get_files.js";

export async function download_lit(ns) {
  let lits = await get_files(ns,".lit")
  for (let i =0; i< lits.length;i++){
    for (let j = 0; j< lits[i][1].length;j++){
      ns.scp(lits[i][1][j],"home",lits[i][0])
    }
  }
}


export async function main(ns) {
  download_lit(ns)
}