/** @param {NS} ns */


export async function main(ns) {
let ingore_stats = [
  "exp",
  "mults",
  "bitNodeN",
  "playtimeSinceLastBitnode",
  "playtimeSinceLastAug"
]
  for (const [key, value] of Object.entries(ns.getPlayer())) {
    if(!ingore_stats.includes(key)){ns.tprint(key, ": ", value)}
  }
}