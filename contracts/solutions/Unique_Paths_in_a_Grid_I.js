/** @param {NS} ns */

/** You are attempting to solve a Coding Contract. 
 * You have 10 tries remaining, after which the contract will self-destruct.


You are in a grid with 9 rows and 12 columns, and you are positioned in the top-left corner of that grid. 
You are trying to reach the bottom-right corner of the grid, but you can only move down or right on each step. 
Determine how many unique paths there are from start to finish.

NOTE: The data returned for this contract is an array with the number of rows and columns:

[9, 12]


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``. */

import { Unique_Paths_in_a_Grid_II } from "contracts/solutions/Unique_Paths_in_a_Grid_II.js";


export function create_matrix(ns, data) {
  let row = []
  let column = []
  row.length = data[0];
  column.length = data[1];
  column.fill(0);
  row.fill(column)
  // ns.tprint(row)
  return row
}

export function Unique_Paths_in_a_Grid_I(ns, data) {
  return Unique_Paths_in_a_Grid_II(ns, create_matrix(ns, data))
}


export async function main(ns) {
  ns.tprint(await Unique_Paths_in_a_Grid_I(ns, [ns.args[0], ns.args[1]]))
}