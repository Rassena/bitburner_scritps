/** @param {NS} ns */
import { get_node_port } from "nodes/get_nodes_info.js";
import { get_nodes } from "nodes/get_nodes.js";



export function clean_ports(ns,nodes){

  for (let i =1;i<=nodes.length;i++){
  ns.clearPort(i)
  }
}

export async function main(ns) {
  let target = "n00dles" 
  let to_write = "elo"
  let port_to_write = get_node_port(ns,target)
  let nodes = get_nodes(ns) 

  clean_ports(ns,nodes)

  for (let i = 0; i<nodes.length;i++){
    ns.tprint(nodes[i], ": ", nodes.indexOf(nodes[i])+1)
  }
  for (let i = 0; i<nodes.length;i++){
    let to_write = "kill " + nodes[i]
  ns.writePort(nodes.indexOf(nodes[i])+1, to_write)
  }
  for (let i = 0; i<nodes.length;i++){
   let data_read = ns.peek(nodes.indexOf(nodes[i])+1)
   ns.tprint(i+1, " Read: ", data_read)
  }

}