/** @param {NS} ns */

export async function main(ns) {
    // await ns.sleep(Math.ceil(ns.args[1]))
    let stock_interfere = false
    if (ns.args[2]){
        if(ns.args[2]==-1){ stock_interfere=true}
    }
    await ns.weaken(ns.args[0],{"additionalMsec":ns.args[1],"stock":stock_interfere})
}