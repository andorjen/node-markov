/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.chain = this.makeChains(words);

  }

  /** set markov chains:
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


  /** return random text from chains */
  getText(numWords = 100) {

    let uniqueWords = Object.keys(this.chain);
    let currentWord = this.getRandItem(uniqueWords)
    let result = [currentWord];


    for (let i = 0; i < numWords; i++) {
      let wordChoices = this.chain[currentWord];
      currentWord = this.getRandItem(wordChoices);

      if (currentWord) {
        result.push(currentWord)
      }// if hit null, pick a new word
      else {
        currentWord = this.getRandItem(uniqueWords)
      }
    }
    return result.join(" ")
  }

  /** helper function that picks a random item from an array */
  getRandItem(arr) {
    const randIdx = Math.floor(Math.random() * arr.length);
    return arr[randIdx];
  }
}


module.exports = { MarkovMachine };

