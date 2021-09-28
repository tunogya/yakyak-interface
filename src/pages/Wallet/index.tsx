import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Spacer,
  Stack
} from "@chakra-ui/react"
import {Trans} from "@lingui/macro"
import {useActiveWeb3React} from "../../hooks/web3";
import {useState} from "react";

export const Wallet = () => {
  const {account} = useActiveWeb3React()
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const parse = (val: string) => val.replace(/^\$/, "")

  return (
    <Stack w={"600px"} h={"600px"} p={6} borderRadius={"xl"} spacing={6}>
      <FormControl id="From">
        <FormLabel><Trans>From</Trans></FormLabel>
        <Input variant="filled" value={account ?? ""} isReadOnly placeholder={"Your address"}/>
      </FormControl>
      <FormControl id="To">
        <FormLabel><Trans>To</Trans></FormLabel>
        <Input variant="filled" placeholder={"Receiver address"} onChange={(e) => setTo(e.target.value)}/>
      </FormControl>
      <FormControl id="Amount">
        <FormLabel><Trans>Amount</Trans></FormLabel>
        <NumberInput variant="filled" placeholder={"Amount"} min={0}
                     onChange={(valueString) => setAmount(parse(valueString))}>
          <NumberInputField/>
        </NumberInput>

        <FormHelperText><Trans>My balance:</Trans>0</FormHelperText>
      </FormControl>
      <Spacer/>
      <Button colorScheme={"blue"} disabled={!account || !to || !amount}>
        <Trans>Transfer</Trans>
      </Button>
    </Stack>
  )
}

export default Wallet
