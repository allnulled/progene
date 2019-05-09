const Progene = require(__dirname + "/../src/progene.js");
const { expect, assert } = require("chai");
const rimraf = require("rimraf");
const fs = require("fs-extra");
const exec = require("execute-command-sync");

describe("Progene binary", function() {

	this.timeout(10000);

	const cleanFolders = function(done) {
		rimraf.sync(__dirname + "/.progene");
		rimraf.sync(__dirname + "/example.txt");
		rimraf.sync(__dirname + "/html5.html");
		rimraf.sync(__dirname + "/example-2.txt");
		setTimeout(done, 1000);
	};

	before(cleanFolders);

	after(cleanFolders);

	it("can progene init --base ", function() {
		expect(fs.existsSync(__dirname + "/.progene")).to.equal(false);
		exec(`progene init "${__dirname}"`);
		expect(fs.existsSync(__dirname + "/.progene")).to.equal(true);
		expect(fs.existsSync(__dirname + "/.progene/progene")).to.equal(true);
		expect(fs.existsSync(__dirname + "/.progene/progene/hello.js")).to.equal(true);
	});

	it("can Progene.run(...)", function() {
		expect(fs.existsSync(__dirname + "/example.txt"));
		exec(`progene init "${__dirname}"`);
		exec(`progene run progene/hello --base "${__dirname}" --name "Carl!" --output "test/example.txt"`);
		expect(fs.existsSync(__dirname + "/example.txt")).to.equal(true);
		expect(fs.readFileSync(__dirname + "/example.txt").toString()).to.equal("Hello Carl!!");
		exec(`progene init "${__dirname}"`);
		exec(`progene run progene/html5 --base "${__dirname}" --title "This is a template for HTML5 files" --output "test/html5.html"`);
		expect(fs.existsSync(__dirname + "/html5.html")).to.equal(true);
	});

	it("can Progene.add(...)", function() {
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(false);
		exec(`progene init "${__dirname}"`);
		exec(`progene add "${__dirname + "/custom"}" --base "${__dirname}"`);
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(true);
		expect(fs.existsSync(__dirname + "/.progene/custom/progene.json")).to.equal(true);
		expect(fs.existsSync(__dirname + "/.progene/custom/bye.js")).to.equal(true);
		expect(fs.existsSync(__dirname + "/example-2.txt")).to.equal(false);
		exec(`progene run custom/bye --base "${__dirname}" --name "Carlson" --output "${__dirname + "/example-2.txt"}"`);
		expect(fs.existsSync(__dirname + "/example-2.txt")).to.equal(true);
		expect(fs.readFileSync(__dirname + "/example-2.txt").toString()).to.equal("Bye Carlson!");
	});

	it("can Progene.remove(...)", function() {
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(true);
		exec(`progene remove custom --base "${__dirname}"`);
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(false);
	});

});