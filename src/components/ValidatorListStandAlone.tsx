import React, { useContext, useEffect, useState } from "react";
import { ValidatorsContext } from '../contexts/validators';




export function ValidatorListStandAlone() {
    const { voteAccountInfos, validatorInfos, totalActivatedStake} = useContext(ValidatorsContext);

    return (
        <div>test</div>
    )
}