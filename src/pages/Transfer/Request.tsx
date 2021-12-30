import {Button, Input, NumberInput, NumberInputField, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {useYakYakBank} from "../../hooks/useYakYakBank";
import {ERROR, IDLE, PROCESSING, SUCCESS} from "../../constants/misc";
import {isAddress} from "../../utils";
import {parseToBigNumber} from "../../utils/bignumberUtil";
import {useGA4React} from "ga-4-react";

export const Request = () => {
  const [amount, setAmount] = useState('0')
  const [signature, setSignature] = useState('')
  const [sender, setSender] = useState('')
  const [id, setId] = useState('')

  const {cash, cashStatus} = useYakYakBank()
  const ga4 = useGA4React()

  const format = (val: string) => val + ' YakYak®'
  const parse = (val: string) => val.replace(/^D/g, '')

  const cashForm = () => {
    return (
      <Stack bg={"white"} p={"30px"} spacing={"32px"} borderRadius={"8px"}>
        <Text fontSize={"20px"}>Cash YakYak® Rewards</Text>
        <Stack direction={"row"} spacing={"20px"}>
          <Input placeholder={"Cheque ID"} w={"40%"} onChange={(e) => {
            setId(e.target.value)
          }}/>
          <NumberInput
            w={"60%"}
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
        <Input placeholder={"Cheque Sender"} isInvalid={!(isAddress(sender) || sender === '')} onChange={(e) => {
          setSender(e.target.value)
        }}/>
        <Input placeholder={"Cheque Signature"} onChange={(e) => {
          setSignature(e.target.value)
        }}/>
        <Stack direction={"row"}>
          <Button variant={"outline"} disabled={id === '' || !isAddress(sender) || signature === '' || amount === '0'}
                  onClick={async () => {
                    if (ga4) {
                      ga4.event("bank", "cash", amount)
                    }
                    const sign = signature.substring(2)
                    const r = "0x" + sign.substring(0, 64)
                    const s = "0x" + sign.substring(64, 128)
                    const v = parseInt(sign.substring(128, 130), 16)

                    await cash(v, r, s, sender, id, parseToBigNumber(amount).shiftedBy(18).toFixed(0))
                  }} isLoading={cashStatus === PROCESSING} loadingText={"Pending"}>
            {cashStatus === IDLE && ("Next")}
            {cashStatus === SUCCESS && ("Success")}
            {cashStatus === ERROR && ("Error")}
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Stack flex={"0 0 60%"} maxW={"60%"}>
        {cashForm()}
      </Stack>
      <Stack flex={"0 0 40%"} maxW={"40%"} px={"30px"} py={"10px"} fontWeight={"bold"}>
        <Text>Invite your friends</Text>
        <Text>Start a fundraiser</Text>
      </Stack>
    </Stack>
  )
}