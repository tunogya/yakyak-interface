import {
  Button,
  FormControl, FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Spacer,
  Stack, Text,
} from "@chakra-ui/react"
import {Trans} from "@lingui/macro"
import {useActiveWeb3React} from "../../hooks/web3"
import {useState} from "react"
import {isAddress} from "../../utils"
import {useETHBalance} from "../../hooks/useETHBalance"
import {PROCESSING} from "../../constants/status";

export const Wallet = () => {
  const {account} = useActiveWeb3React()
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("0")
  const parse = (val: string) => val.replace(/^\$/, "")
  const balance = useETHBalance(account)
  const toBalance = useETHBalance(to)

  return (
    <Stack w={"600px"} h={"600px"} p={6} borderRadius={"xl"} spacing={6}>
      <FormControl id="From">
        <FormLabel>
          <Trans>From</Trans>
        </FormLabel>
        <Input variant="filled" value={account ?? ""} isReadOnly placeholder={"Your address"}/>
      </FormControl>
      <FormControl id="To" isInvalid={to !== "" && !isAddress(to)}>
        <FormLabel>
          <Trans>To</Trans>
        </FormLabel>
        <Input variant="filled" placeholder={"Receiver address"} onChange={e => setTo(e.target.value)}/>
        <FormErrorMessage>
          <Trans>address error</Trans>
        </FormErrorMessage>
        {to !== "" && isAddress(to) && (
          <FormHelperText>
            <Stack direction={"row"}>
              <Text>
                <Trans>Balance:</Trans>
              </Text>
              <Text opacity={ toBalance.state === PROCESSING ? 0.8 : 1}>
                {balance.balance?.formatAmount}
              </Text>
              <Text>ETH</Text>
            </Stack>
          </FormHelperText>
        )}
      </FormControl>
      <FormControl id="Amount">
        <FormLabel>
          <Trans>Amount</Trans>
        </FormLabel>
        <NumberInput
          variant="filled"
          placeholder={"Amount"}
          min={0}
          onChange={valueString => setAmount(parse(valueString))}
        >
          <NumberInputField/>
        </NumberInput>

        <FormHelperText>
          <Stack direction={"row"}>
            <Text>
              <Trans>My balance:</Trans>
            </Text>
            <Text opacity={ balance.state === PROCESSING ? 0.8 : 1}>
              {balance.balance?.formatAmount}
            </Text>
            <Text>ETH</Text>
          </Stack>
        </FormHelperText>
      </FormControl>
      <Spacer/>
      <Button colorScheme={"blue"} disabled={!account || !isAddress(to) || Number(amount) <= 0}>
        <Trans>Transfer</Trans>
      </Button>
    </Stack>
  )
}

export default Wallet
