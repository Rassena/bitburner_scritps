/** @param {NS} ns */
import { get_nodes_with_admin } from "nodes/get_nodes_with_admin.js";


export async function auto_stock_interfere(ns) {

  const INTERFERE_THRESHOLD = 0.5
  while (true) {
  await ns.stock.nextUpdate()
  let target_list = get_nodes_with_admin(ns)

  let products = ns.stock.getSymbols()
  for (let i = 0; i < products.length; i++) {
    let target = get_stock_target(ns, products[i])
    if (target) {
        let interfere = 0
        let target_port_index = target_list.indexOf(target) + 1
      if (ns.stock.getForecast(products[i]) > INTERFERE_THRESHOLD) {
        // ns.tprint(products[i], ": ", target,target_port_index, 1)
        interfere=1
      } else {
        // ns.tprint(products[i], ": ", target,target_port_index, -1)
        interfere=-1
      }
      ns.clearPort(target_port_index)
      ns.writePort(target_port_index,interfere)
    }
  }
  }
}

function get_stock_target(ns, stock_symbol) {
  let nodes_with_admin = get_nodes_with_admin(ns)
  let organization = ns.stock.getOrganization(stock_symbol)
  for (let i = 0; i < nodes_with_admin.length; i++) {
    if (organization == ns.getServer(nodes_with_admin[i]).organizationName) { return nodes_with_admin[i] }
  }
  return undefined
}



export async function main(ns) {
  await auto_stock_interfere(ns)
}