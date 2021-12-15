import { isAddress } from "../utils"
import {useTokenContract} from "./useContract";
import {useState} from "react";
import {YAKYAK_REWARDS_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";

const useYakYakBalance = (address: string | undefined | null) => {
  const { chainId } = useActiveWeb3React()
  const validated = isAddress(address)
  const contract = useTokenContract(YAKYAK_REWARDS_ADDRESS[chainId ?? 4])
  const [balance, setBalance] = useState<undefined | string>()

  const fetchBalance = async () => {
    if (!address || !validated || !contract) return undefined
    const res = await contract.balanceOf(address)
    setBalance(res.toString())
  }

  return {
    fetchBalance,
    balance
  }
}

export default useYakYakBalance
