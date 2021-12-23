import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import Footer from "../../components/Footer"
import React from "react"
import { useActiveWeb3React } from "../../hooks/web3"
import {useMetamask} from "../../hooks/useMetamask";
import {YAKYAK} from "../../constants/tokens";

export const Rewards = () => {
  const metamask = useMetamask()
  const { chainId } = useActiveWeb3React()

  const handleWatchAssets = async () => {
    await metamask.watchAssets(YAKYAK[chainId ?? 1])
  }

  return (
    <Stack w={"full"} spacing={[2, 4, 4, 8]}>
      <Stack bg={"blue.300"} p={[4, 8, 16, 32]} justifyContent={"space-between"} spacing={[4, 8, 8, 16]}>
        <Stack spacing={[2, 2, 4, 4]}>
          <Stack direction={"row"}>
            <Heading color={"blue.700"} fontSize={["2xl", "3xl", "4xl", "5xl"]}>
              YakYak®
            </Heading>
            <Heading color={"blue.500"} fontSize={["2xl", "3xl", "4xl", "5xl"]}>
              Rewards
            </Heading>
          </Stack>
          <Heading color={"blue.700"} fontSize={["2xl", "3xl", "4xl", "5xl"]}>
            Now available on Ethereum!
          </Heading>
        </Stack>

        <Text>Use blockchain technology to protect your membership rewards</Text>

        <Button w={"240px"} onClick={handleWatchAssets}>
          Add YakYak® to Wallet
        </Button>
      </Stack>
      <Stack px={[2, 4, 4, 8]}>
        <Stack bg={"blue.300"} h={"600px"} borderRadius={"3xl"} p={[2, 4, 4, 8]}>
          <Text>Rewards</Text>
        </Stack>
      </Stack>
      <Heading textAlign={"center"} fontSize={["2xl", "3xl", "4xl", "5xl"]}>
        YakYak® Rewards
      </Heading>
      <Stack px={[2, 4, 4, 8]}>
        <Stack bg={"blue.300"} h={"600px"} borderRadius={"3xl"} p={[2, 4, 4, 8]}>
          <Text>Rewards</Text>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  )
}

export default Rewards
