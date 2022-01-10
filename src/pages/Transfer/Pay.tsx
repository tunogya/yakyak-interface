import {Button, Input, NumberInput, NumberInputField, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {isAddress} from "../../utils";
import {useYakYakRewards} from "../../hooks/useYakYakRewards";
import {parseToBigNumber} from "../../utils/bignumberUtil";
import {ERROR, IDLE, PROCESSING, SUCCESS} from "../../constants/misc";
import {useGA4React} from "ga-4-react";

export const Pay = () => {
  const [receipt, setReceipt] = useState('')
  const [amount, setAmount] = useState('0')
  const {transfer, transferStatus} = useYakYakRewards()
  const ga4 = useGA4React()

  const format = (val: string) => val + ' YKR'
  const parse = (val: string) => val.replace(/^D/g, '')

  const transferForm = () => {
    return (
      <Stack bg={"white"} p={"30px"} spacing={"32px"} borderRadius={"8px"}>
        <Text fontSize={"20px"}>Send YakYak Rewards</Text>
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
                  isLoading={transferStatus === PROCESSING}
                  loadingText={"Pending"}
                  onClick={async () => {
                    if (ga4) {
                      ga4.event("bank", "transfer", amount)
                    }
                    await transfer(receipt, parseToBigNumber(amount).shiftedBy(18).toFixed(0))
                  }}>
            { transferStatus === IDLE && ("Next") }
            { transferStatus === SUCCESS && ("Success") }
            { transferStatus === ERROR && ("Error") }
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