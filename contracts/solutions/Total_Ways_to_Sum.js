/** @param {NS} ns */

export function recursion_sums(n,minimum) {
  if (n == 0) { return 1 }
  let result = 0
  for (let i = minimum; i <= (n + 1); i++) {
    result = result + recursion_sums(n - i, i)
  }
  return result
}


export function Total_Ways_to_Sum(ns,data){
  return (recursion_sums(data,1) - 1 )
}


export async function main(ns) {
  ns.tprint(Total_Ways_to_Sum(ns,ns.args[0]))
}