/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0]; if(ns.args[0] == null) { target = "joesguns"; }
	let attackingServer = ns.args[1]; if(ns.args[1] == null) { attackingServer = "home"; }

	while (ns.getServerMaxMoney(target) > ns.getServerMoneyAvailable(target) || ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
		ns.exec("weaken.js", attackingServer, 200, target, Math.random());
		await ns.sleep(ns.getWeakenTime(target) - ns.getGrowTime(target) - 200);
		ns.exec("grow.js", attackingServer, (ns.getServerMaxRam(attackingServer) / ns.getScriptRam("grow.js") - 400), target, Math.random());
		await ns.sleep(ns.getGrowTime(target) + 200);
	}
}