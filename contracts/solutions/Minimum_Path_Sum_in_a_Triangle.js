/** @param {NS} ns */

/** Given a triangle, find the minimum path sum from top to bottom.
 *  In each step of the path, you may only move to adjacent numbers in the row below.
 *  The triangle is represented as a 2D array of numbers:

 Example: If you are given the following triangle:

[
  [2],
  [3, 4],
  [6, 5, 7],
  [4, 1, 8, 3]
]

 The minimum path sum is 11 (2 -> 3 -> 5 -> 1). */

function recursion_path(ns, triangle, row, column) {
  let current = triangle[row][column]
  if (row < triangle.length - 1) {
    let left = recursion_path(ns, triangle, row + 1, column)
    let right =  recursion_path(ns, triangle, row + 1, column + 1)
    if (left < right) {
      // ns.tprint("left:", left)
      return current+ left
    }
    // ns.tprint("right: ", right)
    return current+right
  }
  // ns.tprint("end: " ,current)
  return current
}

export function Minimum_Path_Sum_in_a_Triangle(ns,triangle){
  return recursion_path(ns, triangle, 0, 0)
}

export async function main(ns) {
  ns.tprint(recursion_path(ns, ns.args[0], 0, 0))
}