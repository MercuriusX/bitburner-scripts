/** @param {NS} ns **/
export async function main(ns) {
	let allServers = ["4sigma", "aerocorp", "aevum-police", "alpha-ent", "applied-energetics", "b-and-a", "blade", "catalyst", "clarkinc", "comptek", "crush-fitness", "defcomm", "deltaone", "ecorp", "foodnstuff", "fulcrumassets", "fulcrumtech", "galactic-cyber", "global-pharm", "harakiri-sushi", "helios", "hong-fang-tea", "icarus", "infocomm", "iron-gym", "joesguns", "johnson-ortho", "kuai-gong", "lexo-corp", "max-hardware", "megacorp", "microdyne", "millenium-fitness", "nectar-net", "neo-net", "netlink", "n00dles", "nova-med", "nwo", "omega-net", "omnia", "omnitek", "phantasy", "powerhouse-fitness", "rho-construction", "rothman-uni", "sigma-cosmetics", "silver-helix", "snap-fitness", "solaris", "stormtech", "summit-uni", "syscore", "taiyang-digital", "the-hub", "titan-labs", "unitalife", "univ-energy", "vitalife", "zb-def", "zb-institute", "zer0", "zeus-med", "CSEC", "I.I.I.I", "avmnite-02h", "run4theh111z", ".", "The-Cave", "w0r1d_d43m0n"];
	/*
	let serversWithRamList = ["nectar-net","neo-net","netlink","summit-uni","aevum-police","global-pharm","millenium-fitness","omnia","unitalife","solaris","I.I.I.I","avmnite-02h","catalyst","lexo-corp","univ-energy","omega-net","rothman-uni","rho-construction","CSEC","silver-helix","max-hardware","phantasy","the-hub","zb-institute","alpha-ent","zer0"];
	let targetList = serversWithRamList.concat(homeScan);
	*/
	let homeScan = ns.scan("home");
	let privateServerList = [];
	let initialPrivateServerRam = 2048;
	let currentTargets = ["rho-construction", "microdyne", "snap-fitness", "syscore", "catalyst", "aevum-police", "netlink", "millenium-fitness", "comptek", "summit-uni", "rothman-uni", "the-hub", "johnson-ortho", "omega-net", "silver-helix", "crush-fitness", "phantasy", "iron-gym", "max-hardware", "zer0", "neo-net", "harakiri-sushi", "hong-fang-tea", "nectar-net", "sigma-cosmetics"];
	let baseTarget = "n00dles"; 

	if (ns.getHackingLevel() > 1000) {
		currentTargets = ["galactic-cyber", "infocomm", "solaris", "taiyang-digital", "vitalife", "lexo-corp", "helios", "alpha-ent", "rho-construction", "microdyne", "snap-fitness", "syscore", "catalyst", "aevum-police", "netlink", "millenium-fitness", "comptek", "summit-uni", "rothman-uni", "the-hub", "johnson-ortho", "omega-net", "silver-helix", "crush-fitness", "phantasy"];
		if (ns.getHackingLevel() > 2200) { // alternate target lists to be used when hacking level is high enough
			currentTargets = ["nova-med", "aerocorp", "stormtech", "unitalife", "zb-def", "icarus", "defcomm", "omnia", "powerhouse-fitness", "zb-institute", "titan-labs", "applied-energetics", "galactic-cyber", "infocomm", "solaris", "taiyang-digital", "kuai-gong", "lexo-corp", "helios", "alpha-ent", "rho-construction", "microdyne", "snap-fitness", "syscore", "catalyst"]; // vitalife
			if (ns.getHackingLevel() > 4000) {
				currentTargets = ["ecorp", "megacorp", "blade", "nwo", "kuai-gong", "4sigma", "b-and-a", "omnitek", "clarkinc", "global-pharm", "fulcrumtech", "deltaone", "zeus-med", "univ-energy", "nova-med", "aerocorp", "stormtech", "unitalife", "zb-def", "icarus", "defcomm", "omnia", "powerhouse-fitness", "zb-institute", "titan-labs"];
			}
		}
	}
	
	while (ns.getHackingLevel() < 50) {
		if (!ns.hasRootAccess("foodnstuff")) { ns.nuke("foodnstuff"); }
		ns.run("hack.js", Math.floor(ns.getServerMaxRam("home") / ns.getScriptRam("hack.js") - 6), "foodnstuff");
		await ns.sleep(ns.getHackTime("foodnstuff") + 1000);
	}

	if (ns.getHackingLevel() > 150) {
		baseTarget = "joesguns";
	}

	for (let i = 0; i < allServers.length; i++) {
		if (ns.fileExists("BruteSSH.exe")) { ns.brutessh(allServers[i]); }
		if (ns.fileExists("FTPcrack.exe")) { ns.ftpcrack(allServers[i]); }
		if (ns.fileExists("relaySMTP.exe")) { ns.relaysmtp(allServers[i]); }
		if (ns.fileExists("HTTPWorm.exe")) { ns.httpworm(allServers[i]); }
		if (ns.fileExists("SQLInject.exe")) { ns.sqlinject(allServers[i]); }
		try {
			ns.nuke(allServers[i]);
		} catch (e) {
			let index = currentTargets.indexOf(allServers[i]);
			if (index > -1) {
				currentTargets.splice(index, 1);
				ns.tprint("Removing server from current target list: " + allServers[i]);
			}
		}
	}
	
	if (ns.getHackingLevel() < 300 || ns.getServerMaxRam("home") < 2048) {
		ns.run("earlyGameDistributor.js", 1, baseTarget);
		ns.kill("weakenLoop.js", "home", -1988, "n00dles");
		ns.kill("weakenLoop.js", "home", -1988, "joesguns");
		ns.run("weakenLoop.js", 1, -1988, baseTarget); 
	} else {
		ns.kill("weakenLoop.js", "home", -1988, "n00dles");
		ns.kill("weakenLoop.js", "home", -1988, "joesguns");
		if (!(ns.isRunning("batchHack.js", "home", baseTarget, "home"))) { // ensures batch hack is always happening on joesguns
			ns.run("distributeScript.js", 1, baseTarget, "home");
			ns.run("earlyGameDistributor.js", 1, baseTarget, true);
		}
		while (ns.getServerMoneyAvailable("home") < (initialPrivateServerRam * 55000 * 26) && ns.getPurchasedServers().length != 25) { // prevents script from continuing if all private servers aren't purchased
			await ns.sleep(500);
		}
		for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
			let pservHostname = "pserv-" + i;
			if (homeScan.indexOf(pservHostname) == -1) {
				ns.purchaseServer(pservHostname, initialPrivateServerRam);
			}
			if (privateServerList.indexOf(pservHostname) == -1) {
				privateServerList.push(pservHostname);
			}
		}
		for (let i = 0; i < privateServerList.length; i++) {
			if (i == currentTargets.length) { // safeguard against erroring if the target list is smaller than the number of private servers
				break;
			}
			ns.killall(privateServerList[i]);
			ns.run("distributeScript.js", 1, currentTargets[i], privateServerList[i]);
		}
	}
}