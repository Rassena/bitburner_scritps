/** @param {NS} ns */

const MIN_SYNC = 65
const MAX_SHOCK = 0
const MIN_STATS = 30
const SECOND = 1000
const MINUTE = 60 * SECOND


export async function auto_sleeves(ns) {
  while (true) {
    fix_shock(ns)
    fix_sync(ns)
    const crimes = ns.enums.CrimeType
    let sleeves_count = ns.sleeve.getNumSleeves()
    for (let i = 0; i < sleeves_count; i++) {
      let sleeve = ns.sleeve.getSleeve(i)
      if (sleeve.sync <= MIN_SYNC && sleeve.shock >= MAX_SHOCK) {
        ns.sleeve.setToCommitCrime(i, crimes.homicide)
      }
    }
    await ns.sleep(MINUTE)
  }
}

export function fix_sync(ns) {
  let sleeves_count = ns.sleeve.getNumSleeves()
  for (let i = 0; i < sleeves_count; i++) {
    let sleeve = ns.sleeve.getSleeve(i)
    if (sleeve.sync <= MIN_SYNC) {
      ns.sleeve.setToSynchronize(i)
    }
  }
}

export function fix_shock(ns) {
  let sleeves_count = ns.sleeve.getNumSleeves()
  for (let i = 0; i < sleeves_count; i++) {
    let sleeve = ns.sleeve.getSleeve(i)
    if (sleeve.shock >= MAX_SHOCK) {
      ns.sleeve.setToShockRecovery(i)
    }
  }
}

export async function main(ns) {
  await auto_sleeves(ns)
}