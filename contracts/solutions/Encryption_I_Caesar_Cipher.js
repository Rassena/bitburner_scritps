/** @param {NS} ns */

/** Encryption I: Caesar Cipher
You are attempting to solve a Coding Contract. You have 10 tries remaining, 
after which the contract will self-destruct.


Caesar cipher is one of the simplest encryption technique. 
It is a type of substitution cipher in which each letter 
in the plaintext is replaced by a letter some fixed number of positions down the alphabet. 
For example, with a left shift of 3, D would be replaced by A, E would become B, and A would become X 
(because of rotation).

You are given an array with two elements:
  ["MODEM MEDIA MACRO ENTER TRASH", 2]
The first element is the plaintext, the second element is the left shift value.

Return the ciphertext as uppercase string. Spaces remains the same.


If your solution is an empty string, you must leave the text box empty. Do not use "", '', or ``. */

export let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

export function caesar_encyption(ns, letter, shift) {
  if (alphabet.includes(letter)) {
    let index = (alphabet.indexOf(letter) - (shift)) % (alphabet.length - 1)
    if (index < 0) { index = index + alphabet.length }
    return alphabet[index]
  }
  return letter
}

export function Encryption_I_Caesar_Cipher(ns, data) {
  let solution = ""
  for (let i = 0; i < data[0].length; i++) {
    solution = solution + caesar_encyption(ns, data[0][i], data[1])
  }
  return solution
}

export async function main(ns) {
  ns.tprint(Encryption_I_Caesar_Cipher(ns, ns.args[0]))
}