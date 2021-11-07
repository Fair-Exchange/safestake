import React from "react";
import { CSVLink } from "react-csv";

export function RewardsToCsv(props: {datarray: any}) {

    return (
        <CSVLink
            filename={"SafeRewards.csv"}
            data={props.datarray}
            className="safeBtnInverted"
        >
            Download csv
        </CSVLink>
    )
}