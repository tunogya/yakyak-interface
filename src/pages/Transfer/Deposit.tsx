import {Button, NumberInput, NumberInputField, Stack, Text} from "@chakra-ui/react"
import {useCallback, useEffect, useState} from "react";
import {useYakYakBank} from "../../hooks/useYakYakBank";
import {ERROR, IDLE, PROCESSING, SUCCESS} from "../../constants/misc";
import {formatNumber, parseToBigNumber} from "../../utils/bignumberUtil";
import {useYakYakRewards} from "../../hooks/useYakYakRewards";
import {YAKYAK_BANK_ADDRESS} from "../../constants/addresses";
import {useActiveWeb3React} from "../../hooks/web3";

export const Deposit = () => {
  const [amount, setAmount] = useState('0')
  const format = (val: string) => val + ' YakYak®'
  const parse = (val: string) => val.replace(/^D/g, '')
  const {chainId, account} = useActiveWeb3React()
  const {deposit, depositStatus, balanceOf} = useYakYakBank()
  const {approve, approveStatus} = useYakYakRewards()

  const [balance, setBalance] = useState('')

  const refresh = useCallback(async () => {
    if (!account) return
    setBalance(formatNumber(parseToBigNumber(await balanceOf(account)).shiftedBy(-18).toString()))
  }, [account, balanceOf])

  useEffect(()=>{
    refresh()
  }, [refresh])

  const depositForm = () => {
    return (
      <Stack bg={"white"} p={"30px"} spacing={"32px"} borderRadius={"8px"}>
        <Text fontSize={"20px"}>Send to YakYak® Bank</Text>
        <Stack>
          <Text fontSize={"12px"}>My bank balance: {balance} YakYak®</Text>
          <NumberInput
            onChange={(valueString) => setAmount(parse(valueString))}
            onFocus={(e) => {
              e.target.setSelectionRange(0, amount.length)
            }}
            value={format(amount)}
            min={0}
          >
            <NumberInputField/>
          </NumberInput>
        </Stack>
        <Stack direction={"row"}>
          <Button variant={"outline"} disabled={amount === '0'}
                  onClick={async () => {
                    await approve(YAKYAK_BANK_ADDRESS[chainId ?? 1], parseToBigNumber(amount).shiftedBy(18).toString())
                    await deposit(parseToBigNumber(amount).shiftedBy(18).toString())
                    await refresh()
                  }} isLoading={depositStatus === PROCESSING || approveStatus === PROCESSING} loadingText={"Pending"}>
            {depositStatus === IDLE && ("Next")}
            {depositStatus === SUCCESS && ("Success")}
            {depositStatus === ERROR && ("Error")}
          </Button>
        </Stack>
      </Stack>
    )
  }


  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Stack flex={"0 0 60%"} maxW={"60%"}>
        {depositForm()}
      </Stack>
      <Stack flex={"0 0 40%"} maxW={"40%"} px={"30px"} py={"0px"} fontWeight={"bold"}>
        <Text>Invite your friends</Text>
        <Text>Start a fundraiser</Text>
      </Stack>
    </Stack>
  )
}