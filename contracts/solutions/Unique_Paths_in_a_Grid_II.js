/** @param {NS} ns */


/** 
You are attempting to solve a Coding Contract. 
You have 10 tries remaining, after which the contract will self-destruct.
You are located in the top-left corner of the following grid:

0,0,0,0,1,0,0,0,0,
0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,
0,0,0,1,0,0,1,0,0,
1,0,0,0,0,0,1,0,0,
1,0,1,0,0,0,0,0,1,
0,0,0,0,0,0,0,0,1,
0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,1,0,0,
0,0,0,0,0,1,0,0,0,
0,0,0,1,1,0,0,0,0,
0,0,0,1,0,1,0,0,0,

You are trying reach the bottom-right corner of the grid, 
but you can only move down or right on each step. Furthermore, 
there are obstacles on the grid that you cannot move onto.
These obstacles are denoted by '1', while empty spaces are denoted by 0.

Determine how many unique paths there are from start to finish.
NOTE: The data returned for this contract is an 2D array of numbers representing the grid.
If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``. 

*/


const example = [
[0,0,0,0,1,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,1,0,0],
[1,0,0,0,0,0,1,0,0],
[1,0,1,0,0,0,0,0,1],
[0,0,0,0,0,0,0,0,1],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,1,0,0],
[0,0,0,0,0,1,0,0,0],
[0,0,0,1,1,0,0,0,0],
[0,0,0,1,0,1,0,0,0],
]

export function recursion_unique_path(ns, maze, row, column) {

  let result = 0

  if (maze[row][column] == 1) { return 0 }
  if (row == maze.length-1 && column == maze[maze.length - 1].length-1) { return 1 }

  if (row < maze.length - 1) { result = result + recursion_unique_path(ns, maze, row + 1, column) }
  if (column < maze[row].length - 1) { result = result + recursion_unique_path(ns, maze, row, column + 1) }

  return result
}

export function Unique_Paths_in_a_Grid_II(ns, maze) {
  return recursion_unique_path(ns, maze, 0, 0)
}

export async function main(ns) {
  ns.tprint(recursion_unique_path(ns, example, 0, 0))
}