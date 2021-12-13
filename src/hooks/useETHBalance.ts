import {useActiveWeb3React} from "./web3"
import {isAddress} from "../utils"
import {BigNumber, ethers} from 'ethers'
import {useEffect, useState} from "react";
import useInterval from '@use-it/interval'

export const useETHBalance = (uncheckedAddresses: string | null | undefined) => {
  const {library} = useActiveWeb3React()
  const [balance, setBalance] = useState<{
    value: BigNumber
    amount: string
  }>()

  async function update() {
    if (!uncheckedAddresses || !isAddress(uncheckedAddresses)) {
      return undefined
    }

    try{
      library?.getBalance(uncheckedAddresses).then((balance) => {
          const b = {
            value: balance,
            amount: ethers.utils.formatEther(balance),
          }
          setTimeout(function () {
            setBalance(b)
          }, 3000)
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(()=>{
    if (library){
      update()
    }
  }, [library, uncheckedAddresses])
  useInterval(update, 5000)

  return balance
}