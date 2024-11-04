/** @param {NS} ns */


/**
 
Generate IP Addresses
You are attempting to solve a Coding Contract. 
You have 10 tries remaining, after which the contract will self-destruct.

Given the following string containing only digits, 
return an array with all possible valid IP address combinations that can be created from the string:

3711414344

Note that an octet cannot begin with a '0' unless the number itself is exactly '0'. 
For example, '192.168.010.1' is not a valid IP.

Examples:

25525511135 -> ["255.255.11.135", "255.255.111.35"]
1938718066 -> ["193.87.180.66"]

If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``. 
 
*/

function is_valid_part(ns, part) {
  if (part[0] == 0 || part > 255) { return false }
  return true
}

function get_adresses_ip(ns, data) {
  let result = []
  let length = data.length
    for (let j = 0 + 1; j < length - 2; j++) {
      for (let k = j + 1; k < length - 1; k++) {
        for (let l = k + 1; l < length; l++) {
          let part1 = data.substring(0, j)
          let part2 = data.substring(j, k)
          let part3 = data.substring(k, l)
          let part4 = data.substring(l, length)
          // ns.tprint("ip: " + part1 + "." + part2 + "." + part3 + "." + part4)
          if (is_valid_part(ns, part1) && is_valid_part(ns, part2) && is_valid_part(ns, part3) && is_valid_part(ns, part4)) {
            // ns.tprint("Valit ip: " + part1 + "." + part2 + "." + part3 + "." + part4)
            let ip = "" + part1 + "." + part2 + "." + part3 + "." + part4
            result.push(ip)
          }
        }
      }
    }
  return result
}


export function Generate_IP_Addresses(ns, data) {
  return get_adresses_ip(ns, data)
}

export async function main(ns) {
  ns.tprint(Generate_IP_Addresses(ns, "25525511135"))
}