/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0]; if (ns.args[0] == null) { target = "joesguns"; }
	let attackingServer = ns.args[1]; if (ns.args[1] == null) { attackingServer = "home"; }
	let weakenThreads = 200; if (ns.getServerMaxRam(attackingServer) >= 8192) { weakenThreads = 2000; }
	let growThreads = (ns.getServerMaxRam(attackingServer) / ns.getScriptRam("grow.js") - (weakenThreads * ns.getScriptRam("weaken.js")));

	if (growThreads <= 0) {
		ns.tprint("Not enough ram on server!");
		ns.killall();
	}

	while (ns.getServerMaxMoney(target) > ns.getServerMoneyAvailable(target) || ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
		ns.exec("weaken.js", attackingServer, weakenThreads, target, Math.random());
		await ns.sleep(ns.getWeakenTime(target) - ns.getGrowTime(target) - 200);
		ns.exec("grow.js", attackingServer, growThreads, target, Math.random());
		await ns.sleep(ns.getGrowTime(target) + 200);
	}
}