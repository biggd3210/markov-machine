/** Command-line tool to generate Markov text. */

// example command: node makeText.js file eggs.txt //
// or //
// node makeText.js url {URL HERE}

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');
const { stripHtml } = require('string-strip-html');


function printText(input) {
    newMM = new markov.MarkovMachine(input);
    console.log(`You're new text is: ${newMM.makeText()}`)
}

// async function runStripHTML(data) {
//     const stripHTML = await import('string-strip-html');
//     let text = stripHTML(data);
//     printText(text);
// }

function harvestFile(path) {
    let text = fs.readFileSync(path, 'utf8', (err, data) => {
        console.log(`Error reading ${path}; ${err}`);
        process.exit(1);
    })
    printText(text);
}

function removeHTML(data) {
    try {
        let text = stripHTML(data)
        console.log('SUCCESS! Stripped HTML Tags from text!')
        console.log('stripped html is ', text)
    }
    catch (err) {
        console.log(`Error stripping HTML from URL text: ${err}`)
        process.exit(1)
    }
}
async function harvestURL(url) {
    try {
        let resp = await axios.get(url);
        let text = stripHtml(resp.data).result;
        printText(text);
    }
    catch (err) {
        console.log(`Error fetching ${url}: ${err}`)
        process.exit(1)
    }
}
if (process.argv[2] === 'file') {
    let path = process.argv[3];
    harvestFile(path);
}
if (process.argv[2] === 'url') {
    let url = process.argv[3];
    harvestURL(url);
} 
else {
    console.log(`Error reading input. Please select path to file or url.`)
    process.exit(1);
}
