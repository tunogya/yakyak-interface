import { isAddress } from "../utils"
import {useYakYakRewardContract} from "./useContract";
import {useState} from "react";
import {YAKYAK_REWARDS_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";

const useYakYak = (address: string | undefined | null) => {
  const { chainId } = useActiveWeb3React()
  const validated = isAddress(address)
  const contract = useYakYakRewardContract(YAKYAK_REWARDS_ADDRESS[chainId ?? 4])
  const [balance, setBalance] = useState<undefined | string>()
  const [totalSupply, setTotalSupply] = useState<undefined | string>()
  const [paused, setPaused] = useState<boolean | undefined>()

  const fetch = async () => {
    if (!address || !validated || !contract) return undefined
    const [balance, totalSupply, paused] = await Promise.all([
      contract.balanceOf(address),
      contract.totalSupply(),
      contract.paused(),
    ])

    setBalance(balance.toString())
    setTotalSupply(totalSupply.toString())
    setPaused(paused)
  }

  return {
    fetch,
    balance,
    totalSupply,
    paused,
  }
}

export default useYakYak
