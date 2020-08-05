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
		let chains = new Map()
		for (let i = 0; i < this.words.length; i++) {
			let nextWord = this.words[i + 1] || null
			if (!chains.has(this.words[i])) {
				chains.set(this.words[i], [nextWord])
			} else {
				chains.get(this.words[i]).push(nextWord)
			}
		}
		this.chains = chains
	}

	// 	/** return random text from chains */
	randomText(str) {
		return str[Math.floor(Math.random() * str.length)]
	}

	makeText(numWords = 100) {
		let word = this.randomText(this.words)
		let key = [word]

		for (let i = 0; i < numWords - 1; i++) {
			let words = this.chains.get(word)
			word = this.randomText(words)
			if (word === null) {
				break
			}
			key.push(word)
		}
		return key.join(' ')
	}
}

module.exports = { MarkovMachine }
