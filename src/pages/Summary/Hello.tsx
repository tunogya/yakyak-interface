import {Stack, Text} from "@chakra-ui/react";
import {shortenAddress} from "../../utils";
import {useActiveWeb3React} from "../../hooks/web3";

export const Hello = () => {
  const {account} = useActiveWeb3React()

  return (
    <Stack my={"36px"} fontSize={"30px"}>
      {
        account ? (
          <Text>Hello, {shortenAddress(account ?? 'NaN')}</Text>
        ) : (
          <Text>Login in</Text>
        )
      }
    </Stack>
  )
}