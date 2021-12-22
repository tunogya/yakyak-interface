import React, { FC, useState } from "react"
import { Button, Heading, NumberInput, NumberInputField, Stack } from "@chakra-ui/react"
import { PROCESSING } from "../../constants/misc"
import {useYakYakBank} from "../../hooks/useYakYakBank";
import {useYakYakRewards} from "../../hooks/useYakYakRewards";
import {YAKYAK_BANK_ADDRESS} from "../../constants/addresses";
import {useActiveWeb3React} from "../../hooks/web3";
import {useCheque} from "../../hooks/useCheque";

const Deposit = () => {
  const format = (val: string) => val + " YakYak®"
  const parse = (val: string) => val.replace(/[a-zA-Z\s]+/g, "")
  const [amount, setAmount] = useState("0")
  const [approveAmount, setApproveAmount] = useState("0")
  const { chainId } = useActiveWeb3React()
  const { depositStatus, deposit  } = useYakYakBank()
  const { approve, approveStatus } = useYakYakRewards()
  const { sign } = useCheque()

  const handleApprove = async () => {
    await approve(YAKYAK_BANK_ADDRESS[chainId ?? 1], approveAmount)
  }

  const handleSign = async () => {
    await sign(amount)
  }

  const handleDeposit = async () => {
    await deposit(amount)
  }

  return (
    <Stack spacing={[2, 4, 4, 8]} w={"600px"}>
      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"00"} title={"Deposit funds to the bank (Option)"} />
        <NumberInput
          variant={"filled"}
          min={0}
          onChange={valueString => setApproveAmount(parse(valueString))}
          onFocus={e => {
            e.target.setSelectionRange(0, approveAmount.length)
          }}
          value={format(approveAmount)}
        >
          <NumberInputField />
        </NumberInput>
        <Stack direction={"row"}>
          <Button
            isFullWidth
            variant={"outline"}
            onClick={handleApprove}
            disabled={approveAmount === "0"}
            isLoading={approveStatus === PROCESSING}
            loadingText={"Approving"}
          >
            Approve
          </Button>
          <Button
            isFullWidth
            onClick={handleDeposit}
            isLoading={depositStatus === PROCESSING}
            disabled={approveAmount === "0"}
            loadingText={"Depositing"}
          >
            Deposit
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"01"} title={"Set cheque amount"} />
        <NumberInput
          variant={"filled"}
          min={0}
          onFocus={e => {
            e.target.setSelectionRange(0, amount.length)
          }}
          value={format(amount)}
          onChange={valueString => setAmount(parse(valueString))}
        >
          <NumberInputField />
        </NumberInput>
      </Stack>

      <Stack spacing={[2, 4, 4, 8]}>
        <BankFormTitle id={"02"} title={"Sign cheque"} />
        <Button onClick={handleSign} disabled={amount === "0"}>
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

const BankFormTitle: FC<BankFormTitleProps> = ({ ...props }) => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Heading fontSize={"xl"} color={"blue.500"}>
        {props.id}
      </Heading>
      <Heading fontSize={"xl"} color={"blue.700"}>
        {props.title}
      </Heading>
    </Stack>
  )
}

export default Deposit
