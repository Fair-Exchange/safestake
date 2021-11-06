import React from "react";
import { CSVLink } from "react-csv";

export function RewardsToCsv(props: any) {
    return (
        <CSVLink
            filename={"SafeRewards.csv"}
            data={props.data}
            className="safeBtnInverted"
        >
            Download csv
        </CSVLink>
    )
}