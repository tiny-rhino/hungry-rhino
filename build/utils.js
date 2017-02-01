const path = require('path'),
	glob = require('glob')

module.exports.compileEntry = (srcDir, outDir) => {
	let entry = []

	var files = glob.sync(srcDir).map((file) => {
		entry.push(file)
	})
	
	return entry
}