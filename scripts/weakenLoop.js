/** @param {NS} ns **/
export async function main(ns) {
	let nukeTarget = "nectar-net";
	let freeThreads = ns.args[0] + 2000; if (freeThreads == null) { freeThreads = 2000; }

	while (true) {
		let randomizer = Math.random(); // prevents duplicate thread errors
		ns.exec("weaken.js", ns.getHostname(), (ns.getServerMaxRam("home") / ns.getScriptRam("weaken.js") - freeThreads), nukeTarget, randomizer);
		await ns.sleep(ns.getWeakenTime(nukeTarget) + 1000);
	}
}