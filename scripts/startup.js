/** @param {NS} ns **/
export async function main(ns) {
	let allServers = ["4sigma", "aerocorp", "aevum-police", "alpha-ent", "applied-energetics", "b-and-a", "blade", "catalyst", "clarkinc", "comptek", "crush-fitness", "defcomm", "deltaone", "ecorp", "foodnstuff", "fulcrumassets", "fulcrumtech", "galactic-cyber", "global-pharm", "harakiri-sushi", "helios", "hong-fang-tea", "icarus", "infocomm", "iron-gym", "joesguns", "johnson-ortho", "kuai-gong", "lexo-corp", "max-hardware", "megacorp", "microdyne", "millenium-fitness", "nectar-net", "neo-net", "netlink", "nova-med", "nwo", "omega-net", "omnia", "omnitek", "phantasy", "powerhouse-fitness", "rho-construction", "rothman-uni", "sigma-cosmetics", "silver-helix", "snap-fitness", "solaris", "stormtech", "summit-uni", "syscore", "taiyang-digital", "the-hub", "titan-labs", "unitalife", "univ-energy", "vitalife", "zb-def", "zb-institute", "zer0", "zeus-med", "CSEC", "I.I.I.I", "avmnite-02h", "run4theh111z", ".", "The-Cave"];
	/*
	let serversWithRamList = ["nectar-net","neo-net","netlink","summit-uni","aevum-police","global-pharm","millenium-fitness","omnia","unitalife","solaris","I.I.I.I","avmnite-02h","catalyst","lexo-corp","univ-energy","omega-net","rothman-uni","rho-construction","CSEC","silver-helix","max-hardware","phantasy","the-hub","zb-institute","alpha-ent","zer0"];
	let targetList = serversWithRamList.concat(homeScan);
	*/
	let homeScan = ns.scan("home");
	let privateServerList = [];
	let initialPrivateServerRam = 1024;
	let currentTargets = ["hong-fang-tea", "nectar-net", "neo-net", "zer0", "harakiri-sushi", "netlink", "aevum-police", "summit-uni", "millenium-fitness", "catalyst", "omega-net", "rothman-uni", "rho-construction", "silver-helix", "max-hardware", "phantasy", "the-hub", "alpha-ent", "infocomm", "unitalife", "snap-fitness", "comptek", "syscore", "johnson-ortho", "zb-institute"];

	if (ns.getHackingLevel() > 3000) {
		currentTargets = ["nova-med", "aerocorp", "stormtech", "unitalife", "zb-def", "icarus", "defcomm", "omnia", "powerhouse-fitness", "zb-institute", "titan-labs", "applied-energetics", "galactic-cyber", "infocomm", "solaris", "taiyang-digital", "vitalife", "lexo-corp", "helios", "alpha-ent", "rho-construction", "microdyne", "snap-fitness", "syscore", "catalyst"]
	}
	
	if (ns.getHackingLevel() < 1000) {
		if (ns.hasRootAccess("foodnstuff") == false) { ns.nuke("foodnstuff"); }
		ns.run("hack.js", Math.floor(ns.getServerMaxRam("home") / ns.getScriptRam("hack.js") - 30), "foodnstuff");
		await ns.sleep(ns.getHackTime("foodnstuff") + 1000);
	}

	for (let i = 0; i < allServers.length; i++) {
		if (ns.hasRootAccess(allServers[i]) == false && ns.getHackingLevel() > ns.getServerRequiredHackingLevel(allServers[i])) {
			let numPortsCracked = 0;
			if (ns.fileExists("BruteSSH.exe", "home")) {
				ns.brutessh(allServers[i]);
				numPortsCracked++;
			}
			if (ns.fileExists("FTPcrack.exe", "home")) {
				ns.ftpcrack(allServers[i]);
				numPortsCracked++;
			}
			if (ns.fileExists("relaySMTP.exe", "home")) {
				ns.relaysmtp(allServers[i]);
				numPortsCracked++;
			}
			if (ns.fileExists("HTTPWorm.exe", "home")) {
				ns.httpworm(allServers[i]);
				numPortsCracked++;
			}
			if (ns.fileExists("SQLInject.exe", "home")) {
				ns.sqlinject(allServers[i]);
				numPortsCracked++;
			}
			if (numPortsCracked >= ns.getServerNumPortsRequired(allServers[i])) {
				ns.nuke(allServers[i]);
			}
		}
	}
	
	if (!(ns.isRunning("batchHack.js", "home", "joesguns", "home"))) {
		ns.run("distributeScript.js", 1, "joesguns", "home");
	}
	while (ns.getServerMoneyAvailable("home") < (initialPrivateServerRam * 55000 * 26) && ns.getPurchasedServers().length != 25) {
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
		if (i == currentTargets.length) {
			break;
		}
		ns.killall(privateServerList[i]);
		ns.run("distributeScript.js", 1, currentTargets[i], privateServerList[i]);
		while (ns.isRunning("distributeScript.js", privateServerList[i], currentTargets[i], privateServerList[i])) {
			await ns.sleep(500);
		}
	}
}