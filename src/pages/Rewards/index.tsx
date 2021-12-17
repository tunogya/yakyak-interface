import {Heading, Stack, Text} from "@chakra-ui/react"
import Footer from "../../components/Footer";
import React from "react";

export const Rewards = () => {
  return (
    <Stack w={"full"} spacing={0}>
      <Stack bg={"blue.300"} h={"600px"} p={8}>
        <Text>Rewards</Text>
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
