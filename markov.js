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
    let chain = new Map();

    for (let i = 0; i < words.length; i++) {

      if (!chain.has(words[i])) {
        chain.set(words[i], [words[i + 1] || null]);
      } else {
        chain.get(words[i]).push(words[i + 1] || null);
      }
    }
    return chain;
  }



  /** return random text from chains */

  getText(numWords = 100) {
    // MORE CODE HERE
  }
}




let myMachine = new MarkovMachine("the cat in the hat is in the hat")
console.log(myMachine.chain)