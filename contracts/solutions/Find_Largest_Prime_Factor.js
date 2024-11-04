/** @param {NS} ns */

/** A prime factor is a factor that is a prime number. 
 * What is the largest prime factor of 353843682? */


export function max_prime_factor(number, minimum) {
  for (let i = minimum; i < number; i++) {
    if ((number % i) == 0) {
      number = max_prime_factor(number / i, i)
    }
  }
  return number
}


export function Find_Largest_Prime_Factor(ns ,data){
  return max_prime_factor(data,2)
}

export async function main(ns) {
  ns.tprint(Find_Largest_Prime_Factor(ns,ns.args[0]))
}