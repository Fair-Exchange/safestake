import 'react-virtualized/styles.css';
import React, { useContext, useEffect, useState } from "react";
import { useSolanaExplorerUrlSuffix } from '../contexts/connection';
import { LAMPORTS_PER_SAFE, PublicKey, ValidatorInfo, VoteAccountInfo } from '@safecoin/web3.js';
import { Typography, Link } from '@material-ui/core';
import { formatPct, formatPriceNumber, shortenAddress, sleep } from '../utils/utils';
import { ValidatorScore } from '../utils/validatorsApp';
import { ValidatorsContext } from '../contexts/validators';
import { useAsyncAbortable } from 'react-async-hook';
import { ValidatorApy } from '../utils/stakeviewApp';

const IMG_SRC_DEFAULT = 'placeholder-questionmark.png';

interface ValidatorMeta {
    voteAccountInfo: VoteAccountInfo;
    validatorInfo: ValidatorInfo | undefined;
    validatorScore: ValidatorScore | undefined;
    validatorApy: ValidatorApy | undefined;
};

const BATCH_SIZE = 100;

async function batchMatcher(
    voteAccountStatus: VoteAccountInfo[],
    validatorInfos: ValidatorInfo[],
    validatorScores: ValidatorScore[],
    validatorApys: ValidatorApy[],
    onValidatorMetas: (metas: ValidatorMeta[]) => void,
    abortSignal: AbortSignal
) {
    let validatorMetas: ValidatorMeta[] = [];
    let remainingVoteAccountInfos = [...voteAccountStatus];
    let remainingValidatorInfos = [...validatorInfos];
    let remainingValidatorApys = [...validatorApys];

    //console.log('scores', validatorScores.length)

    for (let i = 0; i < validatorScores.length; i++) {
        const validatorScore = validatorScores[i];
        const voteAccountIndex = remainingVoteAccountInfos.findIndex(info => info.nodePubkey === validatorScore.account);
        if (voteAccountIndex < 0) {
            // If score does not match anything then it goes into the no score bucket
            continue;
        }
        const [voteAccountInfo] = remainingVoteAccountInfos.splice(voteAccountIndex, 1);

        const validatorInfoIndex = remainingValidatorInfos.findIndex(validatorInfo => validatorInfo.key.equals(new PublicKey(voteAccountInfo.nodePubkey)));
        let validatorInfo: ValidatorInfo | undefined;
        [validatorInfo] = validatorInfoIndex > -1 ? remainingValidatorInfos.splice(validatorInfoIndex, 1) : [];

        const validatorApyIndex = remainingValidatorApys.findIndex(validatorApy => validatorApy.id === voteAccountInfo.nodePubkey);
        let validatorApy: ValidatorApy | undefined;
        [validatorApy] = validatorApyIndex > -1 ? remainingValidatorApys.splice(validatorApyIndex, 1) : [];

        validatorMetas.push({
            voteAccountInfo,
            validatorInfo,
            validatorScore,
            validatorApy
        });

        if (i % BATCH_SIZE === 0) {
            await sleep(1);
            console.log(`batch index: ${i}`);
            onValidatorMetas([...validatorMetas]);
        }

        if (abortSignal.aborted) {
            return;
        }
    }

    for (let i = 0; i < remainingVoteAccountInfos.length; i++) {
        const voteAccountInfo = remainingVoteAccountInfos[i];

        const validatorInfoIndex = remainingValidatorInfos.findIndex(validatorInfo => validatorInfo.key.equals(new PublicKey(voteAccountInfo.nodePubkey)));
        let validatorInfo: ValidatorInfo | undefined;
        [validatorInfo] = validatorInfoIndex > -1 ? remainingValidatorInfos.splice(validatorInfoIndex, 1) : [];

        const validatorApyIndex = remainingValidatorApys.findIndex(validatorApy => validatorApy.id === voteAccountInfo.nodePubkey);
        let validatorApy: ValidatorApy | undefined;
        [validatorApy] = validatorApyIndex > -1 ? remainingValidatorApys.splice(validatorApyIndex, 1) : [];

        validatorMetas.push({
            voteAccountInfo,
            validatorInfo,
            validatorScore: undefined,
            validatorApy
        });

        if (i % BATCH_SIZE === 0) {
            await sleep(1);
            console.log(`batch index: ${i}`);
            onValidatorMetas([...validatorMetas]);
        }

        if (abortSignal.aborted) {
            return;
        }
    }

    return validatorMetas;
}

export function ValidatorListStandAlone() {
    const urlSuffix = useSolanaExplorerUrlSuffix();

    const { voteAccountInfos, validatorInfos, validatorScores, validatorApys, totalActivatedStake } = useContext(ValidatorsContext);

    const [validatorMetas, setValidatorMetas] = useState<ValidatorMeta[]>([]);

    // Batched validator meta building
    // Order is VoteAccountInfo[] order, until validatorScores is available
    // VoteAccountInfo with no available score go at the bottom of the list
    useAsyncAbortable(async (abortSignal) => {
        const validatorMetas = await batchMatcher(
            voteAccountInfos,
            validatorInfos,
            validatorScores,
            validatorApys,
            (validatorMetas) => setValidatorMetas(validatorMetas),
            abortSignal
        );
        if (validatorMetas) {
            setValidatorMetas(validatorMetas);
        }
    }, [voteAccountInfos, validatorInfos, validatorScores]);

    if (validatorMetas.length > 0) {
        return (
            <>
                <div className="col-span-12 lg:w-3/5 py-8" >
                    <div className="flex relative px-2 solBoxGray text-center text-gray-500 z-10">
                        <div className="w-2/5 p-3">identity</div>
                        <div className="w-1/6 p-3">stake</div>
                        <div className="w-1/12 p-3">com</div>
                        <div className="w-2/6 p-3">website</div>
                    </div>
                    <div className="arascroll overflow-auto  animate-fade-fast" style={{ height: "40vh" }}>
                        <table className="w-full px-2 table border-separate space-y-6 rounded-lg table text-gray-400  text-sm">
                            <tbody >
                                {validatorMetas.map((newsItem) =>
                                    <tr className="solBoxGray" key={newsItem.voteAccountInfo.votePubkey}>
                                        <td className="w-5/12 p-3">
                                            <div className="flex align-items-center">
                                                <img className="rounded-full h-12 w-12  object-cover" src={newsItem.validatorInfo?.info?.keybaseUsername ?
                                                    `https://keybase.io/${newsItem.validatorInfo?.info?.keybaseUsername}/picture`
                                                    : IMG_SRC_DEFAULT} alt="" />
                                                <div className="ml-3">
                                                    <div className="text-left font-bold text-lg">{newsItem.validatorInfo?.info.name}</div>
                                                    <div className="text-left font-mono  text-gray-500">
                                                        <Link color="secondary" href={`https://explorer.safecoin.org/address/${newsItem.voteAccountInfo.votePubkey}${urlSuffix}`} rel="noopener noreferrer" target="_blank">
                                                            {/*props.cellData.name ? props.cellData.name : shortenAddress(props.cellData.votePubkey, 6)*/}
                                                            {shortenAddress(newsItem.voteAccountInfo.votePubkey, 6)}
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="block">
                                                <div className=" font-mono">
                                                    {formatPriceNumber.format(newsItem.voteAccountInfo.activatedStake / LAMPORTS_PER_SAFE)}
                                                </div>
                                                <div className="text-xs">
                                                    {formatPct.format(newsItem.voteAccountInfo.activatedStake / totalActivatedStake)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 font-bold">
                                            {newsItem.voteAccountInfo.commission} %
                                        </td>
                                        <td className="p-3">
                                            {/*<span className="bg-green-400 text-gray-50 rounded-md px-2">available</span>*/}
                                            <Typography>
                                                <Link color="secondary" href={newsItem.validatorInfo?.info.website} rel="noopener noreferrer" target="_blank">
                                                    {/*TODO: func for remove http*/}
                                                    {newsItem.validatorInfo?.info.website}
                                                </Link>
                                            </Typography>

                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div>LOADING LIST</div>
        )
    }
}
