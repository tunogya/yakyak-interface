import { isAddress } from "../utils"
import {useTokenContract} from "./useContract";
import {useState} from "react";

const useToken = (tokenAddress: string | undefined | null) => {
  const validated = isAddress(tokenAddress)
  const contract = useTokenContract(validated ? validated : undefined)
  const [balance, setBalance] = useState<undefined | string>()

  const fetchBalance = async (address: string | undefined | null) => {
    if (!address || !isAddress(address) || !contract) return undefined
    const res = await contract.balanceOf(address)
    setBalance(res.toString())
  }

  return {
    fetchBalance,
    balance
  }
}

export default useToken
