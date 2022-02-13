/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0]; if(ns.args[0] == null) { target = "joesguns"; }
	let attackingServer = ns.args[1]; if(ns.args[1] == null) { attackingServer = "home" ;}

	await ns.scp("primeServer.js", attackingServer);
	await ns.scp("batchHack.js", attackingServer);
	await ns.scp("weaken.js", attackingServer);
	await ns.scp("hack.js", attackingServer);
	await ns.scp("grow.js", attackingServer);
	ns.exec("primeServer.js", attackingServer, 1, target, attackingServer);
	while (ns.isRunning("primeServer.js", attackingServer, target, attackingServer)) {
		await ns.sleep(100);
	}
	ns.exec("batchHack.js", attackingServer, 1, target, attackingServer);
}