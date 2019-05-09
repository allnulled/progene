const Progene = require(__dirname + "/../src/progene.js");
const { expect, assert } = require("chai");
const rimraf = require("rimraf");
const fs = require("fs-extra");

describe("Progene class", function() {

	this.timeout(10000);

	const cleanFolders = function(done) {
		rimraf.sync(__dirname + "/.progene");
		rimraf.sync(__dirname + "/example.txt");
		rimraf.sync(__dirname + "/html5.html");
		rimraf.sync(__dirname + "/example-2.txt");
		setTimeout(done, 1000);
	};

	beforeEach(cleanFolders);

	after(cleanFolders);

	it("can Progene.init(...)", function() {
		expect(fs.existsSync(__dirname + "/.progene")).to.equal(false);
		Progene.init({ base: __dirname });
		expect(fs.existsSync(__dirname + "/.progene")).to.equal(true);
		expect(fs.existsSync(__dirname + "/.progene/progene")).to.equal(true);
		expect(fs.existsSync(__dirname + "/.progene/progene/hello.js")).to.equal(true);
	});

	it("can Progene.run(...)", function() {
		expect(fs.existsSync(__dirname + "/example.txt"));
		Progene.init({ base: __dirname }).run({
			command: "progene/hello",
			base: __dirname,
			name: "Carl!",
			output: "test/example.txt"
		});
		expect(fs.existsSync(__dirname + "/example.txt")).to.equal(true);
		expect(fs.readFileSync(__dirname + "/example.txt").toString()).to.equal("Hello Carl!!");
		Progene.init({ base: __dirname }).run({
			command: "progene/html5",
			base: __dirname,
			title: "This is a template for HTML5 files",
			output: "test/html5.html"
		});
		expect(fs.existsSync(__dirname + "/html5.html")).to.equal(true);
	});

	it("can Progene.add(...)", function() {
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(false);
		Progene.init({ base: __dirname }).add({
			base: __dirname,
			command: __dirname + "/custom"
		});
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(true);
		expect(fs.existsSync(__dirname + "/.progene/custom/progene.json")).to.equal(true);
		expect(fs.existsSync(__dirname + "/.progene/custom/bye.js")).to.equal(true);
		expect(fs.existsSync(__dirname + "/example-2.txt")).to.equal(false);
		Progene.run({
			base: __dirname,
			command: "custom/bye",
			name: "Carlson",
			output: __dirname + "/example-2.txt"
		});
		expect(fs.existsSync(__dirname + "/example-2.txt")).to.equal(true);
		expect(fs.readFileSync(__dirname + "/example-2.txt").toString()).to.equal("Bye Carlson!");
	});

	it("can Progene.remove(...)", function() {
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(false);
		Progene.init({
			base: __dirname
		}).add({
			base: __dirname,
			command: __dirname + "/custom"
		});
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(true);
		Progene.remove({
			base: __dirname,
			command: "custom"
		});
		expect(fs.existsSync(__dirname + "/.progene/custom")).to.equal(false);
	});

	it("throws at Progene.add(...) when {command}/progene.json file is not found", function() {
		expect(() => Progene.init({ base: __dirname }).add({ base: __dirname, command: __dirname })).to.throw(Progene.Error);
	});

	it("throws at Progene.add(...) when {base}/.progene folder is not found", function() {
		expect(() => Progene.init({ base: __dirname }).add({ base: __dirname + "/customx", command: __dirname + "/custom" })).to.throw(Progene.Error);
	});

	it("throws at Progene.remove(...) when command file is not found", function() {
		expect(() => Progene.init({ base: __dirname }).remove({ base: __dirname, command: "random-command" })).to.throw(Progene.Error);
	});

});