import { CSVLink } from "react-csv";

export function RewardsToCsv(props: {datarray: any, unix: any}) {
    // merge by adding the unix timestamp to csv
    let newMerged = [];
        for (let i = 0; i < props.datarray.length; i++) {
           
            newMerged.push({
                rewardAmount: props.datarray[i].amount,
                commission: props.datarray[i].commission,
                effectiveSlot: props.datarray[i].effectiveSlot,
                epoch: props.datarray[i].epoch,
                postBalance: props.datarray[i].postBalance,
                timestamp: props.datarray[i].timestamp,
                unixtimestamp: props.unix[i],
            });
        }
    return (
        <CSVLink
            filename={"SafeRewards.csv"}
            data={newMerged}
            className="safeBtnInverted"
        >
            Download csv
        </CSVLink>
    )
}