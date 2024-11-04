/** @param {NS} ns */


/** Subarray with Maximum Sum
You are attempting to solve a Coding Contract. 
You have 10 tries remaining, after which the contract will self-destruct.


Given the following integer array, find the contiguous subarray (containing at least one number) 
which has the largest sum and return that sum. 
'Sum' refers to the sum of all the numbers in the subarray.
7,-5,-2,3,-3,-6,8,-1,-3,4,-4,-7,-6,-5,-3,-4,10,8,-8,8,10,0,0,5,-8,-1,9,10,-9,-2,-10,0,-3,4,9,0


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``. */

let example = [7, -5, -2, 3, -3, -6, 8, -1, -3, 4, -4, -7, -6, -5, -3, -4, 10, 8, -8, 8, 10, 0, 0, 5, -8, -1, 9, 10, -9, -2, -10, 0, -3, 4, 9, 0]

export function recursion_subarray(ns, array, position, max) {
  let result = array[position]
  if (position == max) { return result }
  let next = recursion_subarray(ns, array, position + 1, max)
  if (next > 0) { result = result + next }
  return result
}

export function Subarray_with_Maximum_Sum(ns, data) {
  let solution = data[0]
  for (let i = 0; i<data.length;i++){
    let new_solution = recursion_subarray(ns, data, i, data.length - 1)
    if (new_solution>solution){solution=new_solution}
  }
  return solution
}


export async function main(ns) {
  ns.tprint(Subarray_with_Maximum_Sum(ns, example))
}