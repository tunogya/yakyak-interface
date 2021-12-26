import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../constants/misc";
import {useTokenContract} from "./useContract";
import {useState} from "react";
import {parseToBigNumber} from "../utils/bignumberUtil";
import {YAKYAK_REWARDS_ADDRESS} from "../constants/addresses";
import {useActiveWeb3React} from "./web3";

export const useYakYakRewards = () => {
  const { chainId } = useActiveWeb3React()
  const token = useTokenContract(YAKYAK_REWARDS_ADDRESS[chainId ?? 1])
  const [approveStatus, setApproveStatus] = useState(IDLE)

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

  return {
    balanceOf,
    approve,
    approveStatus,
  }
}