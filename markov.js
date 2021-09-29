/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    // this.words = words;
    this.chain = this.makeChains(words);

  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    let chain = {};

    for (let i = 0; i < words.length; i++) {

      if (!(words[i] in chain)) {
        chain[words[i]] = [words[i + 1] || null];
      } else {
        chain[words[i]].push(words[i + 1] || null);
      }
    }
    return chain;
  }


  // makeChains(words) {
  //   let chain = new Map();

  //   for (let i = 0; i < words.length; i++) {

  //     if (!chain.has(words[i])) {
  //       chain.set(words[i], [words[i + 1] || null]);
  //     } else {
  //       chain.get(words[i]).push(words[i + 1] || null);
  //     }
  //   }
  //   return chain;
  // }


  /** return random text from chains */

  getText(numWords = 100) {

    //loop num words of times
    //pick random word from list of keys in chain and then 
    // pick a random word from its chain value
    // use that as next key and then find anotehr word and loop
    let uniqueWords = Object.keys(this.chain);

    let randIdx = Math.floor(Math.random() * uniqueWords.length);  //make a method choice to pick a random item from a given array

    let currentWord = uniqueWords[randIdx];

    let result = currentWord;


    for (let i = 0; i < numWords; i++) {

      let wordChoices = this.chain[currentWord];
      randIdx = Math.floor(Math.random() * wordChoices.length);
      currentWord = wordChoices[randIdx];

      if (currentWord) {
        result += ` ${currentWord}`; // push words into an array, and join at end
      }// if hit null, pick a new word
      else {
        randIdx = Math.floor(Math.random() * uniqueWords.length);
        currentWord = uniqueWords[randIdx];
      }
    }
    return result += ".";
  }
}

// getText(numWords = 100) {

//   //loop num words of times
//   //pick random word from list of keys in chain and then 
//   // pick a random word from its chain value
//   // use that as next key and then find anotehr word and loop
//   let uniqueWords = Array.from(this.chain.keys());

//   let randIdx = Math.floor(Math.random() * uniqueWords.length);

//   let currentWord = uniqueWords[randIdx];

//   let result = currentWord;

//   let wordChoices;

//   for (let i = 0; i < numWords; i++) {

//     wordChoices = this.chain.get(currentWord);

//     randIdx = Math.floor(Math.random() * wordChoices.length);

//     currentWord = wordChoices[randIdx];

//     if (currentWord) {
//       result += ` ${currentWord}`;
//     } else {
//       randIdx = Math.floor(Math.random() * uniqueWords.length);
//       currentWord = uniqueWords[randIdx];
//     }
//   }
//   return result += ".";
// }

module.exports = { MarkovMachine };


// let myMachine = new MarkovMachine(`
// But, in a larger sense, we can not dedicate -- we can not consecrate -- we can
// not hallow -- this ground. The brave men, living and dead, who struggled here,
// have consecrated it, far above our poor power to add or detract. The world will
// little note, nor long remember what we say here, but it can never forget what
// they did here. It is for us the living, rather, to be dedicated here to the
// unfinished work which they who fought here have thus far so nobly advanced. It
// is rather for us to be here dedicated to the great task remaining before us --
// that from these honored dead we take increased devotion to that cause for which
// they gave the last full measure of devotion -- that we here highly resolve that
// these dead shall not have died in vain -- that this nation, under God, shall
// have a new birth of freedom -- and that government of the people, by the
// people, for the people, shall not perish from the earth.
// `)
// // console.log(myMachine.chain)
// console.log(myMachine.getText())