import {Button, Heading, Stack, Text} from "@chakra-ui/react"
import Footer from "../../components/Footer";
import React from "react";

export const Rewards = () => {
  return (
    <Stack w={"full"} spacing={0}>
      <Stack bg={"blue.300"} p={32} justifyContent={"space-between"} spacing={16}>
        <Stack>
          <Stack direction={"row"}>
            <Heading color={"blue.700"} fontSize={"5xl"}>YakYak©</Heading>
            <Heading color={"blue.500"} fontSize={"5xl"}>Rewards</Heading>
          </Stack>
          <Heading color={"blue.700"} fontSize={"5xl"}>Now available on Ethereum!</Heading>
        </Stack>

        <Text>Use blockchain technology to protect your membership rewards</Text>

        <Button w={"240px"}>
          Add YakYak© to Wallet
        </Button>
      </Stack>
      <Stack p={8}>
        <Stack bg={"blue.300"} h={"600px"} m={8} borderRadius={"3xl"} p={8}>
          <Text>Rewards</Text>
        </Stack>
      </Stack>
      <Stack px={20}>
        <Heading textAlign={"center"}>YakYak© Rewards</Heading>
      </Stack>
      <Stack p={8}>
        <Stack bg={"blue.300"} h={"600px"} m={8} borderRadius={"3xl"} p={8}>
          <Text>Rewards</Text>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  )
}

export default Rewards
