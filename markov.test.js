const { MarkovMachine } = require('./markov');

describe("testMarkovMachine", function () {
    let testMarkov;
    beforeAll(function () {
        testMarkov = new MarkovMachine("the cat in the hat is in the hat")
    })
    test("makeChains", function () {
        // const testMarkov = new MarkovMachine("the cat in the hat is in the hat")
        const testChainKeys = Object.keys(testMarkov.chain);
        expect(testChainKeys).toContain("the")
        expect(testChainKeys).toContain("cat")
        expect(testChainKeys).toContain("in")
        expect(testChainKeys).toContain("hat")
        expect(testMarkov.chain["the"]).toEqual(["cat", "hat", "hat"])
    })
    test("getText", function () {
        const text = testMarkov.getText();
        expect(text).toEqual(expect.any(String));

    })

})