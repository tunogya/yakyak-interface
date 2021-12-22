import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import Footer from "../../components/Footer"
import React from "react"
import { YAKYAK_REWARDS_ADDRESS } from "../../constants/addresses"
import { useActiveWeb3React } from "../../hooks/web3"

export const Rewards = () => {
  const { ethereum } = window
  const { chainId } = useActiveWeb3React()

  const handleWatchAssets = () => {
    if (!ethereum || !ethereum.on) {
      return
    }

    ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: YAKYAK_REWARDS_ADDRESS[chainId ?? 1],
            symbol: "YakYak®",
            decimals: 18,
            image: "https://bafybeigjv267r2ghgjluuxtzskkzuqbpjlev2tsefaxs2rbywi2bdqz3ou.ipfs.dweb.link/yakyak.svg",
          },
        },
      })
      .then(success => {
        if (success) {
          console.log("YakYak® successfully added to wallet!")
        } else {
          throw new Error("Something went wrong.")
        }
      })
      .catch(console.error)
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
