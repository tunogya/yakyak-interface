import {Button, Divider, Heading, NumberInput, NumberInputField, Spacer, Stack, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {useActiveWeb3React} from "../../hooks/web3";
import useYakYak from "../../hooks/useYakYak";
import useBank from "../../hooks/useBank";

const Exchange = () => {
  const { account } = useActiveWeb3React()
  const { balance } = useYakYak(account)
  const { balance: bankBalance } = useBank(account)
  const [withdrawAmount, setWithdrawAmount] = useState('0')
  const format = (val: string) => val + ' YakYak®'
  const parse = (val: string) => val.replace(/[a-zA-Z\s]+/g, '')

  return (
    <Stack bg={"blue.300"} w={"400px"} h={"600px"} p={[2, 4, 4, 8]} borderRadius={"20px"} spacing={[2, 4, 8, 8]}>
      <Stack spacing={4}>
        <Stack direction={"row"}>
          <Text color={"blue.700"} fontWeight={"bold"}>My wallet:</Text>
          <Spacer />
          <Text fontWeight={"bold"} color={"blue.700"}>{ balance } YakYak®</Text>
        </Stack>
        <Stack direction={"row"}>
          <Text color={"blue.700"} fontWeight={"bold"}>My bank:</Text>
          <Spacer />
          <Text fontWeight={"bold"} color={"blue.700"}>{bankBalance} YakYak®</Text>
        </Stack>
        <NumberInput variant={"filled"} min={0}
                     onChange={(valueString) => setWithdrawAmount(parse(valueString))}
                     onFocus={(e) => {
                       e.target.setSelectionRange(0, withdrawAmount.length)
                     }}
                     value={format(withdrawAmount)}
        >
          <NumberInputField bg={"white"} _hover={{ bg: "white", borderColor: "blue.500" }}/>
        </NumberInput>
        <Button>
          Withdraw from bank
        </Button>
      </Stack>
      <Heading fontSize={"xl"}>Exchange Cheque</Heading>

    </Stack>
  )
}

export default Exchange