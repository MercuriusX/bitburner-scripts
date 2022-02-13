/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0]; if(ns.args[0] == null) { target = "joesguns"; }
	let attackingServer = ns.args[1]; if(ns.args[1] == null) { attackingServer = "home"; }
	let attackingServerRam = ns.getServerMaxRam(attackingServer);
	let timeToWeaken = ns.getWeakenTime(target);
	let timeToHack = ns.getHackTime(target);
	let timeToGrow = ns.getGrowTime(target);
	let hackThreadsToHalve = Math.floor(ns.hackAnalyzeThreads(target, ns.getServerMaxMoney(target) / 2));
	let securityIncreaseFromHack = ns.hackAnalyzeSecurity(hackThreadsToHalve);
	let threadsToCounterHack = Math.ceil(((securityIncreaseFromHack) / 0.05) + 5); // +5 threads for security
	let growThreadsToDouble = Math.ceil(ns.growthAnalyze(target, 2));
	let securityIncreaseFromGrow = ns.growthAnalyzeSecurity(growThreadsToDouble);
	let threadsToCounterGrow = Math.ceil(((securityIncreaseFromGrow) / 0.05) + 5); // +5 threads for security 
	const weakenRam = ns.getScriptRam("weaken.js");
	const hackRam = ns.getScriptRam("hack.js");
	const growRam = ns.getScriptRam("grow.js");

	if (attackingServerRam > (weakenRam * (threadsToCounterHack + threadsToCounterGrow)) + (hackRam * hackThreadsToHalve) + (growRam * growThreadsToDouble)) {
		while (true) {
			ns.exec("weaken.js", attackingServer, threadsToCounterHack, target, Math.random());
			await ns.sleep(400);
			ns.exec("weaken.js", attackingServer, threadsToCounterGrow, target, Math.random());
			await ns.sleep(timeToWeaken - timeToGrow - 200);
			ns.exec("grow.js", attackingServer, growThreadsToDouble, target, Math.random());
			await ns.sleep(timeToGrow - timeToHack - 400);
			ns.exec("hack.js", attackingServer, hackThreadsToHalve, target, Math.random());
			await ns.sleep(timeToHack + 200);
		}
	} else {
		ns.tprint("Not enough ram on the attacking server: " + attackingServer + ", target: " + target);
	}
}