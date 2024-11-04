/** @param {NS} ns */
export function recursion_scan(ns,host, nodes) {
    let neighbors = ns.scan(host);

  for (let i = 0; i < neighbors.length; i++) {
    if (!nodes.includes(neighbors[i])) {
      nodes.push(neighbors[i])
      nodes = recursion_scan(ns, neighbors[i], nodes)
    }
  }
  return nodes
}

export function get_nodes(ns){
  let nodes = [];
  nodes = recursion_scan(ns,ns.hostname, nodes)
  let ignore = ns.getPurchasedServers()
  ignore.push("home")
  nodes = nodes.filter(nodes => !ignore.includes(nodes));
  return nodes
}

export async function main(ns) {
  ns.tprint(get_nodes(ns))
}
