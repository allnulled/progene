const ejs = require("ejs");
const fs = require("fs");

module.exports = function(options) {
	return new Promise(function(resolve, reject) {
		ejs.renderFile(__dirname + "/templates/html5.ejs", options, function(error, text) {
			if (error) {
				console.log(error);
				return reject();
			}
			fs.writeFileSync(options.output, text, "utf8");
			return resolve();
		});
	});
};
