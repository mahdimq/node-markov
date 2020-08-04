/** Command-line tool to generate Markov text. */
const fs = require('fs')
const { MarkovMachine } = require('./markov')
const axios = require('axios')
const process = require('process')

function makeMarkov(data) {
	let mm = new MarkovMachine(data)
	let text = mm.makeText()
	console.log(text)
}

function readMarkov(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`ERROR reading ${path}: ${err}`)
			process.kill(1)
		}
		makeMarkov(data)
	})
}

async function makeURL(url) {
	try {
		const res = await axios.get(url)
		console.log(res.data)
		makeMarkov(res.data)
	} catch (err) {
		console.log(`ERROR invalid ${url}: ${err}`)
		process.kill(1)
	}
}

let path = process.argv[2]
let url = process.argv[3]

if (path === 'file') {
	readMarkov(path)
} else if (url === 'url') {
	makeURL(url)
} else {
	console.log(`Error`)
	process.exit(1)
}
