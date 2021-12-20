import React, {FC, useState} from "react";
import {Button, Heading, NumberInput, NumberInputField, Stack} from "@chakra-ui/react";
import {useYakYakBankContract, useYakYakRewardContract} from "../../hooks/useContract";
import {YAKYAK_BANK_ADDRESS, YAKYAK_REWARDS_ADDRESS} from "../../constants/addresses";
import {useActiveWeb3React} from "../../hooks/web3";
import {parseToBigNumber} from "../../utils/bignumberUtil";
import {ERROR, IDLE, PROCESSING, SUCCESS} from "../../constants/misc";

const Deposit = () => {
  const format = (val: string) => val + ' YakYak®'
  const parse = (val: string) => val.replace(/[a-zA-Z\s]+/g, '')
  const [approveStatus, setApproveStatus] = useState(IDLE)
  const [depositStatus, setDepositStatus] = useState(IDLE)
  const { chainId } = useActiveWeb3React()
  const yakYakRewards = useYakYakRewardContract(YAKYAK_REWARDS_ADDRESS[chainId ?? 1], true)
  const yakYakBank = useYakYakBankContract(YAKYAK_BANK_ADDRESS[chainId ?? 1], true)

  const [approveAmount, setApproveAmount] = useState('0')
  const [cheque, setCheque] = useState('0')

  const handleApprove = async () => {
    if (!yakYakRewards || approveAmount === "0") { return }
    const amount = parseToBigNumber(approveAmount).shiftedBy(18).toFixed(0)
    try {
      setApproveStatus(PROCESSING)
      const tx = await yakYakRewards.approve(YAKYAK_BANK_ADDRESS[chainId ?? 1], amount)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setApproveStatus(ERROR)
          break
        case 1:
          setApproveStatus(SUCCESS)
          break
      }
    } catch (e) {
      setApproveStatus(ERROR)
    } finally {
      setApproveStatus(IDLE)
    }
  }

  const handleDeposit = async () => {
    if (!yakYakBank || approveAmount === "0") { return }
    const amount = parseToBigNumber(approveAmount).shiftedBy(18).toFixed(0)
    try {
      setDepositStatus(PROCESSING)
      const tx = await yakYakBank.deposit(amount)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setDepositStatus(ERROR)
          break
        case 1:
          setDepositStatus(SUCCESS)
          break
      }
    } catch (e) {
      setDepositStatus(ERROR)
    } finally {
      setDepositStatus(IDLE)
    }

  }

  return (
    <Stack spacing={[2, 4, 4, 8]}>
      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"00"} title={"Deposit funds to the bank (Option)"}/>
        <NumberInput variant={"filled"} min={0}
                     onChange={(valueString) => setApproveAmount(parse(valueString))}
                     onFocus={(e) => {
                       e.target.setSelectionRange(0, approveAmount.length)
                     }}
                     value={format(approveAmount)}
        >
          <NumberInputField/>
        </NumberInput>
        <Stack direction={"row"}>
          <Button isFullWidth variant={"outline"} onClick={handleApprove} disabled={approveAmount === '0'}
                  isLoading={approveStatus === PROCESSING} loadingText={"Approving"}>
            Approve
          </Button>
          <Button isFullWidth onClick={handleDeposit} isLoading={depositStatus === PROCESSING}
                  disabled={approveAmount === '0'} loadingText={"Depositing"}>
            Deposit
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={8}>
        <BankFormTitle id={"01"} title={"Set cheque id"}/>
        <NumberInput variant={"filled"} min={0}>
          <NumberInputField/>
        </NumberInput>
      </Stack>

      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"02"} title={"Set cheque amount"}/>
        <NumberInput variant={"filled"} min={0}>
          <NumberInputField/>
        </NumberInput>
      </Stack>

      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"03"} title={"Sign cheque"}/>
        <Button>
          Sign
        </Button>
      </Stack>





    </Stack>
  )
}

type BankFormTitleProps = {
  id?: string | number
  title: string
}

const BankFormTitle: FC<BankFormTitleProps> = ({...props}) => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Heading fontSize={"xl"} color={"blue.500"}>{props.id}</Heading>
      <Heading fontSize={"xl"} color={"blue.700"}>{props.title}</Heading>
    </Stack>
  )
}

export default Deposit