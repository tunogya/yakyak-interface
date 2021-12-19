import {useActiveWeb3React} from "./web3";
import {isAddress} from "../utils";
import {useYakYakBankContract} from "./useContract";
import {YAKYAK_BANK_ADDRESS} from "../constants/addresses";
import {useEffect, useState} from "react";
import {formatNumber, parseToBigNumber} from "../utils/bignumberUtil";
import useInterval from "@use-it/interval";

const useBank = (address: string | undefined | null) => {
  const { chainId } = useActiveWeb3React()
  const validated = isAddress(address)
  const contract = useYakYakBankContract(YAKYAK_BANK_ADDRESS[chainId ?? 1], true)
  const [balance, setBalance] = useState<undefined | string>()

  const fetch = async () => {
    if (!address || !validated || !contract) return
    const [balance] = await Promise.all([
      contract.balanceOf(address),
    ])
    setBalance(formatNumber(parseToBigNumber(balance).shiftedBy(-18)))
  }

  useEffect(() => {
    fetch()
  }, [address, chainId])
  useInterval(fetch, 3000)

  return {
    balance
  }
}

export default useBank