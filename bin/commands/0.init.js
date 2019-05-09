module.exports = {
	command: "init <base>",
	description: "Initializes a <.progene> project folder.",
	builder: function(yargs) {
		return yargs
			.usage("Usage: $0 init <base>")
			.options({
				base: {
					description: "Directory that contains the current <.progene> folder.",
					demand: false,
					default: process.argv
				},
			})
			.help();
	}
};
