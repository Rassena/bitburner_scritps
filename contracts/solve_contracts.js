/** @param {NS} ns */

import { get_contracts } from "contracts/get_contracts.js";
import { Total_Ways_to_Sum } from "contracts/solutions/Total_Ways_to_Sum.js";
import { Minimum_Path_Sum_in_a_Triangle } from "contracts/solutions/Minimum_Path_Sum_in_a_Triangle.js";
import { Unique_Paths_in_a_Grid_I } from "contracts/solutions/Unique_Paths_in_a_Grid_I.js";
import { Unique_Paths_in_a_Grid_II } from "contracts/solutions/Unique_Paths_in_a_Grid_II.js";
import { Encryption_I_Caesar_Cipher } from "contracts/solutions/Encryption_I_Caesar_Cipher.js";
import { Subarray_with_Maximum_Sum } from "contracts/solutions/Subarray_with_Maximum_Sum.js";
import { Algorithmic_Stock_Trader_I } from "contracts/solutions/Algorithmic_Stock_Trader_I.js";
import { Find_Largest_Prime_Factor } from "contracts/solutions/Find_Largest_Prime_Factor.js";
import { Compression_I_RLE_Compression } from "contracts/solutions/Compression_I_RLE_Compression.js";
import { Encryption_II_Vigenere_Cipher } from "contracts/solutions/Encryption_II_Vigenere_Cipher.js";
import { Generate_IP_Addresses } from "contracts/solutions/Generate_IP_Addresses.js";


// [target, contract, getData(), getContractType()]

const solutions = new Map()
solutions.set("Total Ways to Sum",  Total_Ways_to_Sum)
solutions.set("Minimum Path Sum in a Triangle", Minimum_Path_Sum_in_a_Triangle)
solutions.set("Unique Paths in a Grid I", Unique_Paths_in_a_Grid_I)
solutions.set("Unique Paths in a Grid II", Unique_Paths_in_a_Grid_II)
solutions.set("Encryption I: Caesar Cipher", Encryption_I_Caesar_Cipher)
solutions.set("Subarray with Maximum Sum", Subarray_with_Maximum_Sum)
solutions.set("Algorithmic Stock Trader I", Algorithmic_Stock_Trader_I)
solutions.set("Find Largest Prime Factor", Find_Largest_Prime_Factor)
solutions.set("Compression I: RLE Compression", Compression_I_RLE_Compression)
solutions.set("Encryption II: Vigenère Cipher", Encryption_II_Vigenere_Cipher)
solutions.set("Generate IP Addresses", Generate_IP_Addresses)


export function solve_contract(ns, contract_data) {
  if (solutions.get(contract_data[3])) {
    // ns.tprint(solutions.get(contract_data[3])(ns,contract_data[2]))
    ns.print(contract_data[2])
    ns.tprint(ns.codingcontract.attempt(solutions.get(contract_data[3])(ns,contract_data[2]), contract_data[1], contract_data[0]))
  }
  // else {
  //   ns.tprint("no solution: ", contract_data[3])
  // }
}

export function solve_contracts(ns) {
  let contracts = get_contracts(ns)
  for (let i = 0; i < contracts.length; i++) {
    solve_contract(ns,contracts[i])
  }
}

export async function main(ns) {
  solve_contracts(ns)
}