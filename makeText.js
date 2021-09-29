/** Command-line tool to generate Markov text. */
"use strict";
const { MarkovMachine } = require('./markov');

const fsP = require('fs/promises')
const axios = require('axios')

/** function that takes a path to a file, reads the file and make a markov machine instance, output text*/
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

/** function that takes an url to a file, reads the file and make a markov machine instance, output text*/
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

if (path.includes('http://')) {
    webCat(path);
} else {
    cat(path);
}

