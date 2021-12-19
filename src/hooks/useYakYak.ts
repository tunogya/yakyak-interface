import { isAddress } from "../utils"
import {useYakYakRewardContract} from "./useContract";
import {useEffect, useState} from "react";
import {YAKYAK_REWARDS_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";
import {formatNumber, parseToBigNumber} from "../utils/bignumberUtil";
import useInterval from "@use-it/interval";

const useYakYak = (address: string | undefined | null) => {
  const { chainId } = useActiveWeb3React()
  const validated = isAddress(address)
  const contract = useYakYakRewardContract(YAKYAK_REWARDS_ADDRESS[chainId ?? 4], true)
  const [balance, setBalance] = useState<undefined | string>()
  const [totalSupply, setTotalSupply] = useState<undefined | string>()
  const [paused, setPaused] = useState<boolean | undefined>()

  const fetch = async () => {
    if (!address || !validated || !contract) return
    const [balance, totalSupply, paused] = await Promise.all([
      contract.balanceOf(address),
      contract.totalSupply(),
      contract.paused(),
    ])

    setBalance(formatNumber(parseToBigNumber(balance).shiftedBy(-18)))
    setTotalSupply(formatNumber(parseToBigNumber(totalSupply).shiftedBy(-18)))
    setPaused(paused)
  }

  useEffect(() => {
    fetch()
  }, [address, chainId])
  useInterval(fetch, 3000)

  return {
    balance,
    totalSupply,
    paused,
  }
}

export default useYakYak
