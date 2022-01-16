import {Button, Input, NumberInput, NumberInputField, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {isAddress} from "../../utils";
import {parseToBigNumber} from "../../utils/bignumberUtil";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";
import {useGA4React} from "ga-4-react";
import {useYakYakRewardContract} from "../../hooks/useContract";

export const Mint = () => {
  const [receipt, setReceipt] = useState('')
  const [amount, setAmount] = useState('0')
  const rewards = useYakYakRewardContract()
  const [status, setStatus] = useState(IDLE)
  const ga4 = useGA4React()

  const format = (val: string) => val + ' YKR'
  const parse = (val: string) => val.replace(/^D/g, '')

  const transferForm = () => {
    return (
      <Stack bg={"white"} p={"30px"} spacing={"32px"} borderRadius={"8px"}>
        <Text fontSize={"20px"}>Mint YakYak Rewards</Text>
        <Input placeholder='Enter Address' isInvalid={!(isAddress(receipt) || receipt === '')}
               onChange={(e) => setReceipt(e.target.value)}/>
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
        <Stack direction={"row"}>
          <Button variant={"outline"} disabled={!isAddress(receipt) || amount === ''}
                  isLoading={status === PROCESSING}
                  loadingText={"Pending"}
                  onClick={async () => {
                    if (ga4) {
                      ga4.event("bank", "transfer", amount)
                    }
                    if (rewards) {
                      setStatus(PROCESSING)
                      const tx = await rewards.mint(receipt, parseToBigNumber(amount).shiftedBy(18).toFixed(0))
                      const res = await tx.wait()
                      console.log(res)
                      if (res.status === 1) {
                        setStatus(SUCCESS)
                        setTimeout(() => {
                          setStatus(IDLE)
                        }, IDLE_DELAY)
                      } else {
                        setStatus(ERROR)
                        setTimeout(() => {
                          setStatus(IDLE)
                        }, IDLE_DELAY)
                      }
                    }
                  }}>
            {status === IDLE && ("Next")}
            {status === SUCCESS && ("Success")}
            {status === ERROR && ("Error")}
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Stack flex={"0 0 60%"} maxW={"60%"}>
        {transferForm()}
      </Stack>
      <Stack flex={"0 0 40%"} maxW={"40%"} px={"30px"} py={"10px"} fontWeight={"bold"}>
        <Text>Invite your friends</Text>
        <Text>Send to bank account</Text>
        <Text>Create a cheque</Text>
        <Text>Send and receive donations</Text>
      </Stack>
    </Stack>
  )
}