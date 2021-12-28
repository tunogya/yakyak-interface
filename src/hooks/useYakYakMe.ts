import {useActiveWeb3React} from "./web3";
import {YAKYAK_ME_ADDRESS} from "../constants/addresses";
import {useYakYakMeContract} from "./useContract";
import {ERROR, IDLE, IDLE_DELAY, SUCCESS} from "../constants/misc";
import {useState} from "react";
import {ethers} from "ethers";


export const useYakYakMe = () => {
  const {chainId} = useActiveWeb3React()
  const me = useYakYakMeContract(YAKYAK_ME_ADDRESS[chainId ?? 1], true)
  const [takeStatus, setTakeStatus] = useState(IDLE)
  const [updateStatus, setUpdateStatus] = useState(IDLE)

  const nameToAddress = async (name: string) => {
    if (!me) return 'NaN'
    try {
      return ethers.utils.parseBytes32String(await me.nameToAddress(ethers.utils.formatBytes32String(name)))
    } catch (e) {
      return 'NaN'
    }
  }

  const addressToName = async (account: string) => {
    if (!me) return 'NaN'
    try {
      return ethers.utils.parseBytes32String(await me.addressToName(ethers.utils.formatBytes32String(account)))
    } catch (e) {
      return 'NaN'
    }
  }

  const take = async (name: string) => {
    if (!me) return
    try {
      const tx = await me.take(ethers.utils.formatBytes32String(name))
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setTakeStatus(ERROR)
          setTimeout(() => {
            setTakeStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setTakeStatus(SUCCESS)
          setTimeout(() => {
            setTakeStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setTakeStatus(ERROR)
      setTimeout(() => {
        setTakeStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  const update = async (name: string) => {
    if (!me) return
    try {
      const tx = await me.update(ethers.utils.formatBytes32String(name))
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setUpdateStatus(ERROR)
          setTimeout(() => {
            setUpdateStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setUpdateStatus(SUCCESS)
          setTimeout(() => {
            setUpdateStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setUpdateStatus(ERROR)
      setTimeout(() => {
        setUpdateStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return {
    fetchAddress: nameToAddress,
    fetchName: addressToName,
    take,
    takeStatus,
    update,
    updateStatus
  }
}