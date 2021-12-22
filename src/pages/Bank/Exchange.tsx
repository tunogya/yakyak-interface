import { Button, Heading, NumberInput, NumberInputField, Spacer, Stack, Text } from "@chakra-ui/react"
import React, {useState} from "react"
import {PROCESSING} from "../../constants/misc"
import useInterval from "@use-it/interval";
import {useActiveWeb3React} from "../../hooks/web3";
import {formatNumber, parseToBigNumber} from "../../utils/bignumberUtil";
import {useYakYakBank} from "../../hooks/useYakYakBank";
import {useYakYakRewards} from "../../hooks/useYakYakRewards";

const Exchange = () => {
  const format = (val: string) => val + " YakYak®"
  const parse = (val: string) => val.replace(/[a-zA-Z\s]+/g, "")

  const [withdrawAmount, setWithdrawAmount] = useState("0")
  const { balanceOf: bankBalanceOf, withdraw, withdrawStatus } = useYakYakBank()
  const [bankBalance, setBankBalance] = useState('0')
  const [balance, setBalance] = useState('0')
  const { account } = useActiveWeb3React()
  const { balanceOf } = useYakYakRewards()

  useInterval(async () => {
    if (account) {
      setBankBalance(formatNumber(parseToBigNumber(await bankBalanceOf(account)).shiftedBy(-18).toString()))
      setBalance(formatNumber(parseToBigNumber(await balanceOf(account)).shiftedBy(-18).toString()))
    }

  }, 3000)

  const handleWithdraw = async () => {
    if (account){
      await withdraw(account, withdrawAmount)
    }
  }

  return (
    <Stack bg={"blue.300"} w={"400px"} h={"600px"} p={[2, 4, 4, 8]} borderRadius={"20px"} spacing={[2, 4, 8, 8]}>
      <Stack spacing={4}>
        <Stack direction={"row"}>
          <Text color={"blue.700"} fontWeight={"bold"}>
            My wallet:
          </Text>
          <Spacer />
          <Text fontWeight={"bold"} color={"blue.700"}>
            {balance} YakYak®
          </Text>
        </Stack>
        <Stack direction={"row"}>
          <Text color={"blue.700"} fontWeight={"bold"}>
            My bank:
          </Text>
          <Spacer />
          <Text fontWeight={"bold"} color={"blue.700"}>
            {bankBalance} YakYak®
          </Text>
        </Stack>
        <NumberInput
          variant={"filled"}
          min={0}
          onChange={valueString => setWithdrawAmount(parse(valueString))}
          onFocus={e => {
            e.target.setSelectionRange(0, withdrawAmount.length)
          }}
          value={format(withdrawAmount)}
        >
          <NumberInputField bg={"white"} _hover={{ bg: "white", borderColor: "blue.500" }} />
        </NumberInput>
        <Button
          isLoading={withdrawStatus === PROCESSING}
          loadingText={"Withdrawing"}
          disabled={withdrawAmount === "0"}
          onClick={handleWithdraw}
        >
          Withdraw from bank
        </Button>
      </Stack>
      <Heading fontSize={"xl"}>Exchange Cheque</Heading>
    </Stack>
  )
}

export default Exchange
