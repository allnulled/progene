const fs = require("fs");
const path = require("path");

module.exports = function(options) {
	return fs.writeFileSync(path.resolve(options.output), `Bye ${options.name}!`, "utf8");
};