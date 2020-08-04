/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/)
		this.words = words.filter((c) => c !== '')
		this.makeChains()
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO
		let chain = {}
		for (let i = 0; i < this.words.length; i++) {
			let currWord = this.words[i]
			let nextWord = this.words[i + 1]

			if (!chain[currWord]) {
				chain[currWord] = [nextWord]
			} else {
				chain[currWord].push(nextWord || null)
			}
		}
		return chain
	}

	/** return random text from chains */
	randomText(chain) {
		return chain[Math.floor(Math.random() * chain.length)]
	}

	randomKeys() {
		return this.words[Math.floor(Math.random() * this.words.length)]
	}

	makeText(numWords = 100) {
		// TODO
		let keys = this.randomKeys()
		let output = keys
		for (let i = 0; i < numWords; i++) {
			let currWord = this.randomText(keys)
			if (currWord) {
				output += `${currWord}`
				keys = currWord
			} else break
		}
		return output
	}
}

module.exports = { MarkovMachine }
