import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../constants/misc";
import {useYakYakRewardContract} from "./useContract";
import {useState} from "react";
import {parseToBigNumber} from "../utils/bignumberUtil";

export const useYakYakRewards = () => {
  const token = useYakYakRewardContract()
  const [approveStatus, setApproveStatus] = useState(IDLE)
  const [transferStatus, setTransferStatus] = useState(IDLE)

  const balanceOf = async (account: string | undefined) => {
    if (!token || !account) return 'NaN'
    try {
      return parseToBigNumber(await token.balanceOf(account)).shiftedBy(-18)
    }catch (e){
      return 'NaN'
    }
  }

  const approve = async (spender: string, value: string) => {
    if (!token) return
    try {
      setApproveStatus(PROCESSING)
      const tx = await token.approve(spender, value)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setApproveStatus(ERROR)
          setTimeout(() => {
            setApproveStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setApproveStatus(SUCCESS)
          setTimeout(() => {
            setApproveStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setApproveStatus(ERROR)
      setTimeout(() => {
        setApproveStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  const transfer = async (to: string, value: string) => {
    if (!token) return
    try {
      setTransferStatus(PROCESSING)
      const tx = await token.transfer(to, value)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setTransferStatus(ERROR)
          setTimeout(() => {
            setTransferStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setTransferStatus(SUCCESS)
          setTimeout(() => {
            setTransferStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    }catch (e){
      setTransferStatus(ERROR)
      setTimeout(() => {
        setTransferStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return {
    balanceOf,
    approve,
    approveStatus,
    transfer,
    transferStatus,
  }
}