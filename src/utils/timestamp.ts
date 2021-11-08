import { Connection, LAMPORTS_PER_SAFE } from "@safecoin/web3.js";
import { unixToLocalTime } from "./utils";

export async function processEffSlotforUnixTS(connection: Connection, epochs: number[], effslots: number[]) {
    const countEpoch = epochs.length;
    var unixTime:number []  = [];
    var unixTimeAndHuman:any []  = [];
    for (let i = 0; i < countEpoch; i++) {
        try {
            const blockTime:number = await connection.getBlockTime(effslots[i]) ?? 0;
            unixTime.push(blockTime)
        }
        catch { }
    }
    unixTimeAndHuman.push(unixTime);
    unixTimeAndHuman.push(unixToLocalTime(unixTime));
    console.log("uniunixTimeAndHumanxtime: ", unixTimeAndHuman)
    return unixTimeAndHuman;
}

export function mergeNewStakeArray(timestamp: any[], nativeinfos: any[]) {
    if (timestamp === undefined) {
    } else {
        let newMerged = [];
        for (let i = 0; i < timestamp.length; i++) {
            newMerged.push({
                amount: nativeinfos[i].amount / LAMPORTS_PER_SAFE,
                commission: nativeinfos[i].commission,
                effectiveSlot: nativeinfos[i].effectiveSlot,
                epoch: nativeinfos[i].epoch,
                postBalance: nativeinfos[i].postBalance / LAMPORTS_PER_SAFE,
                timestamp: timestamp[i]
            });
        }
        return newMerged;
    }
}