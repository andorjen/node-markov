/** Command-line tool to generate Markov text. */
"use strict";
const { MarkovMachine } = require('./markov');

const fsP = require('fs/promises')
const axios = require('axios')

/** function that takes a path to a file */


async function cat(path) {

    try {
        let contents = await fsP.readFile(path, "utf8");
        let markov = new MarkovMachine(contents)
        console.log(markov.getText());
    } catch (err) {
        console.log(err.stack);
        process.exit(1);

    }
};


async function webCat(url) {
    try {
        let resp = await axios.get(url);
        // console.log("resp", resp)
        let markov = new MarkovMachine(resp.data)
        console.log(markov.getText());
    } catch (err) {
        console.log(err.stack);
        process.exit(1);
    }
};



let path = process.argv[3];
console.log("path is", path)
if (path.includes('http://')) {
    console.log("inside webCat")
    webCat(path);
} else {
    cat(path);
}

