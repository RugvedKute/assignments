/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
let string2 = str.replaceAll(" ", "")
const string = string2.replace(/[|&;$%"<>?!()+.,]/g , "");
const input = string.toLowerCase().split('');
  let palindromeString = ''
  for(let i=input.length - 1; i >= 0; i--) {
    palindromeString += input[i]
  }
  return string.toLowerCase() === palindromeString;
}

console.log(isPalindrome('Eva, can I see bees in a cave?'))

module.exports = isPalindrome;
