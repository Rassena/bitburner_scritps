/** @param {NS} ns */




export async function main(ns) {
  let to_print
  ns.corporation.getConstants()
  let corporation_data = ns.corporation.getCorporation()

  to_print = ns.corporation.getDivision(corporation_data.divisions[0])
  ns.corporation.getOffice()
  ns.corporation.setSmartSupply()
  ns.tprint(to_print)
}