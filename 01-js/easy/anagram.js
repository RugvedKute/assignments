/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1Array = str1.toLowerCase().replaceAll(" ", "").split('')
  str2Array = str2.toLowerCase().replaceAll(" ", "").split('');
  if (str1Array.length != str2Array.length) {
    return false;
  }
  for (let i = 0; i < str2Array.length; i++) {
    const index  = str1Array.findIndex((data) => data === str2Array[i]);
    if (index === -1) {
      return false;
    }
  }
  return true;

}

console.log(isAnagram('hdHDJSAHDJs jks!&a', 'djsakd'))
module.exports = isAnagram;
