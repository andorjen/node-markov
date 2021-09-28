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

    //loop num words of times
    //pick random word from list of keys in chain and then 
    // pick a random word from its chain value
    // use that as next key and then find anotehr word and loop
    let uniqueWords = Array.from(this.chain.keys());
    
    let randIdx = Math.floor(Math.random() * uniqueWords.length);

    let currentWord = uniqueWords[randIdx];

    let result = currentWord;

    let wordChoices;

    for (let i = 0; i < numWords; i++){
      
      wordChoices = this.chain.get(currentWord);

      randIdx = Math.floor(Math.random() * wordChoices.length);
      
      currentWord = wordChoices[randIdx];

      if(currentWord){
        result += ` ${currentWord}`;
      }else{
        randIdx = Math.floor(Math.random() * uniqueWords.length);
        currentWord = uniqueWords[randIdx];
      }
    }
    return result += ".";
  }
}




let myMachine = new MarkovMachine(`Four score and seven years ago our fathers brought forth on this continent, a
new nation, conceived in Liberty, and dedicated to the proposition that all men
[sic] are created equal.

Now we are engaged in a great civil war, testing whether that nation, or any
nation so conceived and so dedicated, can long endure. We are met on a great
battle-field of that war. We have come to dedicate a portion of that field, as
a final resting place for those who here gave their lives that that nation
might live. It is altogether fitting and proper that we should do this.

But, in a larger sense, we can not dedicate -- we can not consecrate -- we can
not hallow -- this ground. The brave men, living and dead, who struggled here,
have consecrated it, far above our poor power to add or detract. The world will
little note, nor long remember what we say here, but it can never forget what
they did here. It is for us the living, rather, to be dedicated here to the
unfinished work which they who fought here have thus far so nobly advanced. It
is rather for us to be here dedicated to the great task remaining before us --
that from these honored dead we take increased devotion to that cause for which
they gave the last full measure of devotion -- that we here highly resolve that
these dead shall not have died in vain -- that this nation, under God, shall
have a new birth of freedom -- and that government of the people, by the
people, for the people, shall not perish from the earth.
`)
// console.log(myMachine.chain)
console.log(myMachine.getText())