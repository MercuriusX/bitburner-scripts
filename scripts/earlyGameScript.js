/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0]; if (ns.args[0] == null) { target = "joesguns"; }
	let moneyThresh = ns.getServerMaxMoney(target) * 0.9;
	let securityThresh = ns.getServerMinSecurityLevel(target) + 5;

	while (true) {
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}
		await ns.sleep(200);
	}
}