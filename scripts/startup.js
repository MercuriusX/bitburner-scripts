/** @param {NS} ns **/
export async function main(ns) {
	let serverList = ["nectar-net","neo-net","netlink","summit-uni","aevum-police","global-pharm","millenium-fitness","omnia","unitalife","solaris","I.I.I.I","avmnite-02h","catalyst","lexo-corp","univ-energy","omega-net","rothman-uni","rho-construction","CSEC","silver-helix","max-hardware","phantasy","the-hub","zb-institute","alpha-ent","zer0"]
	let targetList = serverList.concat(ns.scan("home"));
	let homeScan = ns.scan("home");
	let currentHackingLevel = ns.getHackingLevel();
	let privateServerList = [];
	let currentTargets = ["hong-fang-tea", "nectar-net", "neo-net", "zer0", "harakiri-sushi", "netlink", "aevum-police", "summit-uni", "millenium-fitness", "catalyst", "omega-net", "rothman-uni", "rho-construction", "silver-helix", "max-hardware", "phantasy", "the-hub", "alpha-ent"];
	let privateServerRam = 2048;

	if (currentHackingLevel < 300) {
		if (ns.hasRootAccess("foodnstuff") == false) { ns.nuke("foodnstuff"); }
		ns.run("hack.js", Math.floor(ns.getServerMaxRam("home") / ns.getScriptRam("hack.js") - 30), "foodnstuff");
		await ns.sleep(ns.getHackTime("foodnstuff") + 200);
	}

	for (let i = 0; i < targetList.length; i++) {
		if (ns.hasRootAccess(targetList[i]) == false && currentHackingLevel > ns.getServerRequiredHackingLevel(targetList[i])) {
			let numPortsCracked = 0;
			if (ns.fileExists("BruteSSH.exe", "home")) {
				ns.brutessh(targetList[i]);
				numPortsCracked++;
			}
			if (ns.fileExists("FTPcrack.exe", "home")) {
				ns.ftpcrack(targetList[i]);
				numPortsCracked++;
			}
			if (ns.fileExists("relaySMTP.exe", "home")) {
				ns.relaysmtp(targetList[i]);
				numPortsCracked++;
			}
			if (ns.fileExists("HTTPWorm.exe", "home")) {
				ns.httpworm(targetList[i]);
				numPortsCracked++;
			}
			if (ns.fileExists("SQLInject.exe", "home")) {
				ns.sqlinject(targetList[i]);
				numPortsCracked++;
			}
			if (numPortsCracked >= ns.getServerNumPortsRequired(targetList[i])) {
				ns.nuke(targetList[i]);
			}
		}
	}
	if (!(ns.isRunning("batchHack.js", "home", "joesguns", "home"))) {
		ns.run("distributeScript.js", 1, "joesguns", "home");
	}
	while (ns.getServerMoneyAvailable("home") < (privateServerRam * 55000 * 26) && ns.getPurchasedServers().length != 25) {
		await ns.sleep(100);
	}
	for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
		let pservHostname = "pserv-" + i;
		if (homeScan.indexOf(pservHostname) == -1) {
			ns.purchaseServer(pservHostname, privateServerRam);
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
			await ns.sleep(100);
		}
	}
}