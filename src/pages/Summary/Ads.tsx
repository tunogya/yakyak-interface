import {Button, Stack, Text} from "@chakra-ui/react";
import {useMetamask} from "../../hooks/useMetamask";
import {YAKYAK} from "../../constants/tokens";
import {useActiveWeb3React} from "../../hooks/web3";

export const Ads = () => {
  const { chainId } = useActiveWeb3React()
  const { watchAssets } = useMetamask()

  return (
    <Stack>
      <Stack bg={"white"} p={"48px"} borderRadius={"8px"} spacing={"24px"}>
        <Text fontSize={"24px"}>YakYak® Rewards is on Rinkeby network!</Text>
        <Text>We use blockchain to record members' rewards points.</Text>
        <br/>
        <Button w={"240px"} onClick={()=> watchAssets(YAKYAK[chainId ?? 1])}>
          Add Rewards to Metamask
        </Button>
      </Stack>
    </Stack>
  )
}