const path = require("path");
const rimraf = require("rimraf");
const globby = require("globby");
const fs = require("fs-extra");

class ProgeneError extends Error {}

class Progene {

	static get Error() {
		return ProgeneError;
	}

	static get DEFAULT_OPTIONS() {
		return {
			base: process.cwd(),
			command: "progene/hello"
		};
	}

	static init(optionsParameter = {}) {
		const options = { ...this.DEFAULT_OPTIONS, ...optionsParameter };
		const progenePath = path.resolve(options.base, ".progene");
		try {
			fs.copySync(__dirname + "/.progene", progenePath);
		} catch(error) {
			throw new this.Error(`[progene init] Error installing progene files:`, error);
		}
		return this;
	}

	static run(optionsParameter = {}) {
		const options = { ...this.DEFAULT_OPTIONS, ...optionsParameter };
		const generatorPath = path.resolve(options.base, ".progene", options.command + ".js");
		const generator = require(generatorPath);
		return typeof generator === "function" ? generator.call(Progene, options, generatorPath) : generator;
	}

	static add(optionsParameter = {}) {
		const options = { ...this.DEFAULT_OPTIONS, ...optionsParameter };
		const commandPath = path.resolve(options.command);
		const commandProgenePath = path.resolve(commandPath, "progene.json");
		try {
			JSON.parse(fs.readFileSync(commandProgenePath).toString());
		} catch(error) {
			throw new this.Error(`[progene add] Error: progene command project must specify a well-formed <progene.json> file to be a valid progene command, but <${commandProgenePath}> was not found or valid JSON file.`);
		}
		const command = path.basename(commandPath);
		const progenePath = path.resolve(options.base, ".progene");
		if(!fs.existsSync(progenePath)) {
			throw new this.Error(`[progene add] Error: progene <base> option (by default your current working directory) must contain a <.progene> directory. Not found at: <${options.base}>`);
		}
		const customCommandPath = path.resolve(progenePath, command);
		fs.copySync(commandPath, customCommandPath);
		return this;
	}

	static remove(optionsParameter = {}) {
		const options = { ...this.DEFAULT_OPTIONS, ...optionsParameter };
		const commandPath = path.resolve(options.base, ".progene", options.command);
		if(!fs.existsSync(commandPath)) {
			throw new this.Error(`[progene remove] Error: command path not found for <${commandPath}>`);
		}
		rimraf.sync(commandPath);
		return this;
	}

}

module.exports = Progene;