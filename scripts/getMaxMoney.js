/** @param {NS} ns **/
export async function main(ns) {
	let serverList = ["nectar-net","neo-net","netlink","summit-uni","aevum-police","global-pharm","millenium-fitness","omnia","unitalife","solaris","I.I.I.I","avmnite-02h","catalyst","lexo-corp","univ-energy","omega-net","rothman-uni","rho-construction","CSEC","silver-helix","max-hardware","phantasy","the-hub","zb-institute","alpha-ent","zer0"]
	let targetList = serverList.concat(ns.scan("home"));

	for (let i = 0; i < targetList.length; i++) {
		if (ns.hasRootAccess(targetList[i]) && targetList[i].indexOf("pserv") < 0) {
			ns.tprint(targetList[i] + ": " + ns.getServerMaxMoney(targetList[i]));
		}
	}
}