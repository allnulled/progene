module.exports = {
	command: "add <command>",
	description: "Adds a <progene> command from its folder.",
	builder: function(yargs) {
		return yargs
			.usage("Usage: $0 add <command> [options]")
			.options({
				base: {
					description: "Directory that contains the current <.progene> folder.",
					demand: false
				},
			})
			.options({
				command: {
					description: "Command to be added. Must specify a path with a <progene.json>.",
					demand: true
				},
			})
			.help();
	}
};
