import {useYakYakBankContract} from "./useContract";
import {useState} from "react";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../constants/misc";

export const useYakYakBank = () => {
  const bank = useYakYakBankContract()
  const [withdrawStatus, setWithdrawStatus] = useState(IDLE)
  const [depositStatus, setDepositStatus] = useState(IDLE)
  const [redeemStatus, setRedeemStatus] = useState(IDLE)

  const balanceOf = async (account: string | undefined) => {
    if (!bank) return 'NaN'
    try {
      return await bank.balanceOf(account)
    } catch (e) {
      return 'NaN'
    }
  }

  const withdraw = async (account: string, amount: string) => {
    if (!bank) return
    try {
      const tx = await bank.withdraw(account, amount)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setWithdrawStatus(ERROR)
          setTimeout(() => {
            setWithdrawStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setWithdrawStatus(SUCCESS)
          setTimeout(() => {
            setWithdrawStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setWithdrawStatus(ERROR)
      setTimeout(() => {
        setWithdrawStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  const deposit = async (amount: string) => {
    if (!bank) return
    try {
      setDepositStatus(PROCESSING)
      const tx = await bank.deposit(amount)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setDepositStatus(ERROR)
          setTimeout(() => {
            setDepositStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setDepositStatus(SUCCESS)
          setTimeout(() => {
            setDepositStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setDepositStatus(ERROR)
      setTimeout(() => {
        setDepositStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  const redeem = async (v: number, r: string, s: string, sender: string, id: string, amount: string) => {
    if (!bank) return
    try {
      setRedeemStatus(PROCESSING)
      const tx = await bank.redeem(v, r, s, sender, id, amount)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setRedeemStatus(ERROR)
          setTimeout(() => {
            setRedeemStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setRedeemStatus(SUCCESS)
          setTimeout(() => {
            setRedeemStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setRedeemStatus(ERROR)
      setTimeout(() => {
        setRedeemStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return {
    balanceOf,
    withdraw,
    withdrawStatus,
    deposit,
    depositStatus,
    redeem,
    redeemStatus,
  }
}