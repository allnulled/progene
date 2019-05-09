const fs = require("fs");
const path = require("path");

module.exports = function(options) {
	const name = options.name || "world";
	fs.writeFileSync(path.resolve(options.output), `Hello ${name}!`, "utf8");
};