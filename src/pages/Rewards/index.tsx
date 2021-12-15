import { Button, Spacer, Stack, Text } from "@chakra-ui/react"
import { useActiveWeb3React } from "../../hooks/web3"
import useToken from "../../hooks/useToken";
import {YAKYAK_REWARDS_ADDRESS} from "../../constants/addresses";
import {useEffect} from "react";

export const Rewards = () => {
  const { account, chainId } = useActiveWeb3React()
  const token = useToken(YAKYAK_REWARDS_ADDRESS[chainId ?? 4])

  useEffect(()=>{
    token.fetchBalance(account)
  }, [account, token])

  return (
    <Stack w={"container.md"} h={"full"} spacing={16}>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        Welcome back,
        <br />
        {account} !
      </Text>
      <Stack>
        <Text fontSize={"xl"}>My Rewards</Text>
        <Stack direction={"row"} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"baseline"}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              { token.balance ? token.balance : "NaN" }
            </Text>
            <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"}>
              YakYak©
            </Text>
          </Stack>
          <Spacer />
          <Button variant={"ghost"}>Send</Button>
          <Button variant={"outline"}>Receive</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Rewards
