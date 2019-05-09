module.exports = {
	command: "run <command>",
	description: "Runs a <progene> command.",
	builder: function(yargs) {
		return yargs
			.usage("Usage: $0 run <command> [options]")
			.options({
				base: {
					description: "Directory that contains the current <.progene> folder.",
					demand: false
				},
			})
			.options({
				command: {
					description: "Command to be run. Must be like: <vendor/command>.",
					demand: true
				},
			})
			.help();
	}
};
