import { Connection } from "@safecoin/web3.js";
import { unixToLocalTime } from "./utils";

export async function processEffSlotforUnixTS(connection: Connection, epochs: number[], effslots: number[]) {
    const countEpoch = epochs.length;
    var unixTime:number []  = [];
    for (let i = 0; i < countEpoch; i++) {
        try {
            const blockTime:number = await connection.getBlockTime(effslots[i]) ?? 0;
            unixTime.push(blockTime)
        }
        catch { }
    }
    return unixToLocalTime(unixTime);
}

export function mergeNewStakeArray(timestamp: any[], nativeinfos: any[]) {
    if (timestamp === undefined) {
    } else {
        let newMerged = [];
        for (let i = 0; i < timestamp.length; i++) {
            newMerged.push({
                amount: nativeinfos[i].amount,
                commission: nativeinfos[i].commission,
                effectiveSlot: nativeinfos[i].effectiveSlot,
                epoch: nativeinfos[i].epoch,
                postBalance: nativeinfos[i].postBalance,
                timestamp: timestamp[i]
            });
        }
        return newMerged;
    }
}