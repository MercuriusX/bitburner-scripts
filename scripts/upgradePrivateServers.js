/** @param {NS} ns **/
export async function main(ns) {
	let multiplier = ns.args[0]; if (ns.args[0] == null) { multiplier = 1; }
	let ram = ns.getServerMaxRam("pserv-0");
	let newRam = ram * 2 * multiplier;
	let upgradeAvailable = ns.getServerMoneyAvailable("home") > newRam * 55000 * 25;
	let totalUpgradeCost = newRam * 55000 * 25

	if (upgradeAvailable) {
		for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
			let hostname = "pserv-" + i;
			ns.tprint("Upgrading: " + hostname);
			ns.killall(hostname);
			ns.deleteServer(hostname);
			ns.purchaseServer(hostname, newRam);
		}
	} else {
		ns.tprint("Not enough money to upgrade all pserv ram: $" + totalUpgradeCost.toLocaleString());
	}
}