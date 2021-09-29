import {useActiveWeb3React} from "./web3"
import {isAddress} from "../utils"
import {ethers} from 'ethers'
import {atom, useRecoilState} from "recoil";

export const ethBalanceAtom = atom({
  key: "eth-balance",
  default: ""
})

export const useETHBalance = (uncheckedAddresses: string | undefined) => {
  const {library} = useActiveWeb3React()
  const [balance, setBalance] = useRecoilState(ethBalanceAtom)

  if (!uncheckedAddresses || !isAddress(uncheckedAddresses)) {
    return undefined
  }

  library?.getBalance(uncheckedAddresses).then((balance) => {
      setBalance(ethers.utils.formatEther(balance))
    }
  )

  return balance + " ETH"
}