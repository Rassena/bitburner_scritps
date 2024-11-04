/** @param {NS} ns */

/** 
  Run-length encoding (RLE) is a data compression technique which encodes data as a series of runs 
  of a repeated single character. Runs are encoded as a length, followed by the character itself. 
  Lengths are encoded as a single ASCII digit; runs of 10 characters or more are encoded 
  by splitting them into multiple runs.

  You are given the following input string:
  bbTTTAAAAAAAAAAQQQQQQQQQQQnnPAAnnTttmmTTSBB00Ly7PPPPZZXXg6bbbbbbbbbbbbbssssssQQQQQ
  Encode it using run-length encoding with the minimum possible output length.

 Examples:
  aaaaabccc            -> 5a1b3c
  aAaAaA               -> 1a1A1a1A1a1A
  111112333            -> 511233
  zzzzzzzzzzzzzzzzzzz  -> 9z9z1z (or 9z8z2z, etc.) 
*/

const max_number = 9

let examples = {
  "aaaaabccc": "5a1b3c",
  "aAaAaA": "1a1A1a1A1a1A",
  "111112333": "511233",
}

export function recursion_encode(ns, data, position, repeat) {
  let result = ""
  if (position == data.length - 1) {
    result = repeat + data[position]
    return result
  }
  if (repeat == max_number) {
    result = repeat + data[position] + recursion_encode(ns, data, position + 1, 1)
    return result
  }
  if (data[position] == data[position + 1]) { return recursion_encode(ns, data, position + 1, repeat + 1) }
  else {
    result = repeat + data[position] + recursion_encode(ns, data, position + 1, 1)
    return result
  }

}

export function Compression_I_RLE_Compression(ns, data) {
  return recursion_encode(ns, data, 0, 1)
}


export async function main(ns) {
  ns.tprint(Compression_I_RLE_Compression(ns, ns.args[0]))
}