/** @param {NS} ns */

import {expand_divisions} from "corporation/corporation_expand_divisions.js"

export async function main(ns) {
  ns.tprint("corporation/corporation_step_1.js")
  let next_step = "corporation/corporation_step_2.js"

  expand_divisions(ns)

  ns.spawn(next_step)
} 