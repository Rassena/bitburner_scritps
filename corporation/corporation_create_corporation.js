/** @param {NS} ns */
export async function main(ns) {
  let corporation_name = "Rassena"
  let self_fund = true
  let industry_type = "Agriculture"

  create_corporation(ns, corporation_name, self_fund)
  create_industry(ns, industry_type, industry_type)
}

export function create_corporation(ns, corporation_name, self_fund) {
  if (ns.args[0] !== undefined) { self_fund = false }
  if (!ns.corporation.hasCorporation()) {
    ns.corporation.createCorporation(corporation_name, self_fund)
  }
}

export function create_industry(ns, industry_type, industry_name) {
  ns.corporation.getCorporation().divisions
  if (ns.corporation.getCorporation().divisions.length == 0) {
    ns.corporation.expandIndustry(industry_type, industry_name)
  }
}