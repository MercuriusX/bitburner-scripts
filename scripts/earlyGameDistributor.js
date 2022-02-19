/** @param {NS} ns **/
export async function main(ns) {
	let allServers = ["4sigma", "aerocorp", "aevum-police", "alpha-ent", "applied-energetics", "b-and-a", "blade", "catalyst", "clarkinc", "comptek", "crush-fitness", "defcomm", "deltaone", "ecorp", "foodnstuff", "fulcrumassets", "fulcrumtech", "galactic-cyber", "global-pharm", "harakiri-sushi", "helios", "hong-fang-tea", "icarus", "infocomm", "iron-gym", "joesguns", "johnson-ortho", "kuai-gong", "lexo-corp", "max-hardware", "megacorp", "microdyne", "millenium-fitness", "nectar-net", "neo-net", "netlink", "nova-med", "nwo", "omega-net", "omnia", "omnitek", "phantasy", "powerhouse-fitness", "rho-construction", "rothman-uni", "sigma-cosmetics", "silver-helix", "snap-fitness", "solaris", "stormtech", "summit-uni", "syscore", "taiyang-digital", "the-hub", "titan-labs", "unitalife", "univ-energy", "vitalife", "zb-def", "zb-institute", "zer0", "zeus-med", "CSEC", "I.I.I.I", "avmnite-02h", "run4theh111z", ".", "The-Cave", "w0r1d_d43m0n"];	
	let hackableServers = [];
	let target = ns.args[0]; if (ns.args[0] == null) { target = "joesguns"; }
	let swapFunctions = ns.args[1]; if (swapFunctions == null) { swapFunctions = false; }

	for (let i = 0; i < allServers.length; i++) {
		if (ns.hasRootAccess(allServers[i]) && ns.getServerMaxRam(allServers[i]) != 0) {
			hackableServers.push(allServers[i]);
		}
	}

	for (let i = 0; i < hackableServers.length; i++) {
		ns.tprint("Updating early game script for: " + hackableServers[i] + "(weaken looping: " + swapFunctions + ")");	
		await ns.scp("earlyGameScript.js", hackableServers[i]);
		await ns.scp("weaken.js", hackableServers[i]);
		await ns.scp("grow.js", hackableServers[i]);
		await ns.scp("hack.js", hackableServers[i]);
		await ns.scp("weakenLoop.js", hackableServers[i]);
		ns.killall(hackableServers[i]);
		if (swapFunctions) {
			ns.exec("weakenLoop.js", hackableServers[i], 1, -2000, target);
		} else {
			ns.exec("earlyGameScript.js", hackableServers[i], (ns.getServerMaxRam(hackableServers[i]) / ns.getScriptRam("earlyGameScript.js")), target);
		}
		await ns.sleep(50);
	}
}