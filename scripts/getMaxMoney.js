/** @param {NS} ns **/
export async function main(ns) {
	let allServers = ["4sigma", "aerocorp", "aevum-police", "alpha-ent", "applied-energetics", "b-and-a", "blade", "catalyst", "clarkinc", "comptek", "crush-fitness", "defcomm", "deltaone", "ecorp", "foodnstuff", "fulcrumassets", "fulcrumtech", "galactic-cyber", "global-pharm", "harakiri-sushi", "helios", "hong-fang-tea", "icarus", "infocomm", "iron-gym", "joesguns", "johnson-ortho", "kuai-gong", "lexo-corp", "max-hardware", "megacorp", "microdyne", "millenium-fitness", "nectar-net", "neo-net", "netlink", "nova-med", "nwo", "omega-net", "omnia", "omnitek", "phantasy", "powerhouse-fitness", "rho-construction", "rothman-uni", "sigma-cosmetics", "silver-helix", "snap-fitness", "solaris", "stormtech", "summit-uni", "syscore", "taiyang-digital", "the-hub", "titan-labs", "unitalife", "univ-energy", "vitalife", "zb-def", "zb-institute", "zer0", "zeus-med", "CSEC", "I.I.I.I", "avmnite-02h", "run4theh111z", "."];
	/*
	let serverList = ["nectar-net","neo-net","netlink","summit-uni","aevum-police","global-pharm","millenium-fitness","omnia","unitalife","solaris","I.I.I.I","avmnite-02h","catalyst","lexo-corp","univ-energy","omega-net","rothman-uni","rho-construction","CSEC","silver-helix","max-hardware","phantasy","the-hub","zb-institute","alpha-ent","zer0"]
	let targetList = serverList.concat(ns.scan("home"));
	*/

	for (let i = 0; i < allServers.length; i++) {
		if (ns.hasRootAccess(allServers[i]) && allServers[i].indexOf("pserv") < 0 && ns.getServerMaxMoney(allServers[i]) != 0) {
			ns.tprint(allServers[i] + ": " + ns.getServerMaxMoney(allServers[i]).toLocaleString());
		}
	}
}