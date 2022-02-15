/** @param {NS} ns **/
export async function main(ns) {
	let nukeTarget = "nectar-net";
	let host = ns.getHostname();
	let freeThreads = ns.args[0] + 2000; if (freeThreads == null) { freeThreads = 2000; }
	let runningThreads = ns.getServerMaxRam(host) / ns.getScriptRam("weaken.js"); if (runningThreads - freeThreads <= 0) { freeThreads = 0; }

	while (true) {
		let randomizer = Math.random(); // prevents duplicate thread errors
		ns.exec("weaken.js", host, (runningThreads - freeThreads), nukeTarget, randomizer);
		await ns.sleep(ns.getWeakenTime(nukeTarget) + 1000);
	}
}