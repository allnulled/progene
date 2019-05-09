module.exports = {
	command: "remove <command>",
	description: "Removes a <progene> command.",
	builder: function(yargs) {
		return yargs
			.usage("Usage: $0 remove <command>")
			.options({
				base: {
					description: "Directory that contains the current <.progene> folder.",
					demand: false
				},
			})
			.options({
				command: {
					description: "Command to be removed. Must be like: <vendor>.",
					demand: true
				},
			})
			.help();
	}
};
