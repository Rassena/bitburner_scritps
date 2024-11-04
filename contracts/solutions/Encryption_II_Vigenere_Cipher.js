/** @param {NS} ns */


/** 

Vigenère cipher is a type of polyalphabetic substitution. 
It uses  the Vigenère square to encrypt and decrypt plaintext with a keyword.

 Vigenère square:
      A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 
    +----------------------------------------------------
  A | A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 
  B | B C D E F G H I J K L M N O P Q R S T U V W X Y Z A 
  C | C D E F G H I J K L M N O P Q R S T U V W X Y Z A B
  D | D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
  E | E F G H I J K L M N O P Q R S T U V W X Y Z A B C D
 ...
  Y | Y Z A B C D E F G H I J K L M N O P Q R S T U V W X
  Z | Z A B C D E F G H I J K L M N O P Q R S T U V W X Y

 For encryption each letter of the plaintext is paired with the corresponding letter of a repeating keyword. 
 For example, the plaintext DASHBOARD is encrypted with the keyword LINUX:
  Plaintext: DASHBOARD
  Keyword:LINUXLINU
 So, the first letter D is paired with the first letter of the key L. 
 Therefore, row D and column L of the  Vigenère square are used to get the first cipher letter O. 
 This must be repeated for the whole ciphertext.

 You are given an array with two elements:
 ["LINUXMACROCACHEARRAYPRINT", "FLOWCHART"]
 The first element is the plaintext, the second element is the keyword.

 Return the ciphertext as uppercase string.

 */


export let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let example = ["LINUXMACROCACHEARRAYPRINT", "FLOWCHART"]


export function vigenere_encyption(ns, letter, shift) {
  if (alphabet.includes(letter)) {
    let index = (alphabet.indexOf(letter) + (shift)) % (alphabet.length)
    if (index < 0) { index = index + alphabet.length }
    return alphabet[index]
  }
  return letter
}

export function Encryption_II_Vigenere_Cipher(ns, data) {
  let solution = ""
  for (let i = 0; i < data[0].length; i++) {
    let shift = alphabet.indexOf(data[1][i%data[1].length])
    // ns.tprint(data[0][i], " + ",data[1][i%data[1].length], " = ", vigenere_encyption(ns, data[0][i], shift ), " shift: ", shift)
    solution = solution + vigenere_encyption(ns, data[0][i], shift )
  }
  return solution
}

export async function main(ns) {
  ns.tprint(Encryption_II_Vigenere_Cipher(ns, example))
}
