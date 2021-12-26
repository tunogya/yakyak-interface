import {Spacer, Stack, Text, Divider} from "@chakra-ui/react";
import {useMetamask} from "../../hooks/useMetamask";
import {YAKYAK} from "../../constants/tokens";
import {useActiveWeb3React} from "../../hooks/web3";

export const Ads = () => {
  const {chainId} = useActiveWeb3React()
  const {watchAssets} = useMetamask()

  return (
    <Stack>
      <Stack bg={"white"} borderRadius={"20px"} h={"240px"}>
        <Stack px={"24px"} py={"12px"}>
          <Text fontSize={"24px"}>YakYak® Rewards is on Rinkeby network!</Text>
          <Text>We use blockchain to record members' rewards points.</Text>
        </Stack>
        <Spacer/>
        <Divider/>
        <Stack direction={"row"} p={"4px 24px 12px 24px"}>
          <Text onClick={() => watchAssets(YAKYAK[chainId ?? 1])} color={"primary"} cursor={"pointer"}
                fontSize={"15px"}
                fontWeight={"bold"}>Add Rewards to Metamask</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}