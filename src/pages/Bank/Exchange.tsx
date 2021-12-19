import {Heading, Spacer, Stack, Text} from "@chakra-ui/react";
import React from "react";
import {useActiveWeb3React} from "../../hooks/web3";
import useYakYak from "../../hooks/useYakYak";
import useBank from "../../hooks/useBank";

const Exchange = () => {
  const { account } = useActiveWeb3React()
  const { balance } = useYakYak(account)
  const { balance: bankBalance } = useBank(account)

  return (
    <Stack bg={"blue.300"} w={"400px"} h={"600px"} p={[2, 4, 4, 8]} borderRadius={"20px"} spacing={[2, 4, 4, 8]}>
      <Stack>
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
      </Stack>
      <Heading fontSize={"xl"}>Exchange Cheque</Heading>

    </Stack>
  )
}

export default Exchange