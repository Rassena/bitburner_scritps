/** @param {NS} ns */
import { create_industry, create_corporation } from "corporation/corporation_create_corporation.js"

export async function main(ns) {

  ns.tprint("corporation/corporation_step_0.js")

  let self_fund = true
  let corporation_name = "Rassena"
  let industry_type = "Agriculture"
  let next_step = "corporation/corporation_step_1.js"

  create_corporation(ns, corporation_name, self_fund)
  create_industry(ns, industry_type, industry_type)
  if (!ns.corporation.hasUnlock("Smart Supply")) { ns.corporation.purchaseUnlock("Smart Supply") }

  ns.spawn(next_step)
}
