import {Button, Heading, NumberInput, NumberInputField, Spacer, Stack, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {useActiveWeb3React} from "../../hooks/web3";
import useReadYakYakRewards from "../../hooks/useReadYakYakRewards";
import useReadBank from "../../hooks/useReadBank";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";
import {useYakYakBankContract} from "../../hooks/useContract";
import {YAKYAK_BANK_ADDRESS} from "../../constants/addresses";
import {parseToBigNumber} from "../../utils/bignumberUtil";

const Exchange = () => {
  const format = (val: string) => val + ' YakYak®'
  const parse = (val: string) => val.replace(/[a-zA-Z\s]+/g, '')

  const {account, chainId} = useActiveWeb3React()
  const {balance} = useReadYakYakRewards(account)
  const {balance: bankBalance} = useReadBank(account)
  const [withdrawAmount, setWithdrawAmount] = useState('0')
  const [withdrawStatus, setWithdrawStatus] = useState(IDLE)
  const contract = useYakYakBankContract(YAKYAK_BANK_ADDRESS[chainId ?? 1], true)

  const handleWithdraw = async () => {
    if (!contract || withdrawAmount === "0" || !account) {
      return
    }
    const amount = parseToBigNumber(withdrawAmount).shiftedBy(18).toFixed(0)
    try {
      const tx = await contract.withdraw(account, amount)
      const res = await tx.wait()
      switch (res.status) {
        case 0:
          setWithdrawStatus(ERROR)
          setTimeout(()=>{
            setWithdrawStatus(IDLE)
          }, IDLE_DELAY)
          break
        case 1:
          setWithdrawStatus(SUCCESS)
          setTimeout(()=>{
            setWithdrawStatus(IDLE)
          }, IDLE_DELAY)
          break
      }
    } catch (e) {
      setWithdrawStatus(ERROR)
      setTimeout(()=>{
        setWithdrawStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return (
    <Stack bg={"blue.300"} w={"400px"} h={"600px"} p={[2, 4, 4, 8]} borderRadius={"20px"} spacing={[2, 4, 8, 8]}>
      <Stack spacing={4}>
        <Stack direction={"row"}>
          <Text color={"blue.700"} fontWeight={"bold"}>My wallet:</Text>
          <Spacer/>
          <Text fontWeight={"bold"} color={"blue.700"}>{balance} YakYak®</Text>
        </Stack>
        <Stack direction={"row"}>
          <Text color={"blue.700"} fontWeight={"bold"}>My bank:</Text>
          <Spacer/>
          <Text fontWeight={"bold"} color={"blue.700"}>{bankBalance} YakYak®</Text>
        </Stack>
        <NumberInput variant={"filled"} min={0}
                     onChange={(valueString) => setWithdrawAmount(parse(valueString))}
                     onFocus={(e) => {
                       e.target.setSelectionRange(0, withdrawAmount.length)
                     }}
                     value={format(withdrawAmount)}
        >
          <NumberInputField bg={"white"} _hover={{bg: "white", borderColor: "blue.500"}}/>
        </NumberInput>
        <Button isLoading={withdrawStatus === PROCESSING} loadingText={"Withdrawing"} disabled={withdrawAmount === '0'}
                onClick={handleWithdraw}>
          Withdraw from bank
        </Button>
      </Stack>
      <Heading fontSize={"xl"}>Exchange Cheque</Heading>

    </Stack>
  )
}

export default Exchange