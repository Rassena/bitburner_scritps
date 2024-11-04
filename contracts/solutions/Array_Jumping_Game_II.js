/** @param {NS} ns */


/**

Array Jumping Game II
You are attempting to solve a Coding Contract. You have 3 tries remaining, 
after which the contract will self-destruct.


You are given the following array of integers:

2,1,1,3,5,0,1,1

Each element in the array represents your MAXIMUM jump length at that position. 
This means that if you are at position i and your maximum jump length is n, 
you can jump to any position from i to i+n.

Assuming you are initially positioned at the start of the array, 
determine the minimum number of jumps to reach the end of the array.

If it's impossible to reach the end, then the answer should be 0.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``.

 */

let example = [2,1,1,3,5,0,1,1]


function recursion_minimal_jumps(ns,array,position){
  let result = 999
  if (position == array.length-1){return 1}
  if (array[position]==0){return 999}
  for (let i = 1; i<=array[position];i++){
    let jumps = recursion_minimal_jumps(ns,array,position+i)
    // ns.tprint(position, " ", jumps)
    if (jumps<result){
      result=jumps
    }
  }
  ns.tprint(position," ", result)
  return result
}

export function Array_Jumping_Game_II(ns,data){
  return recursion_minimal_jumps(ns,data,0)
}

export async function main(ns) {
  ns.tprint(Array_Jumping_Game_II(ns,example))
}