import { Heading, Stack, Wrap, WrapItem } from "@chakra-ui/react"
import React from "react"
import Deposit from "./Deposit"
import Exchange from "./Exchange"

const Bank = () => {
  return (
    <Stack w={"full"} h={"full"}>
      <Stack h={"72px"} w={"full"} bg={"blue.300"} alignItems={"center"} justifyContent={"center"}>
        <Heading fontSize={"2xl"}>YakYak® Bank</Heading>
      </Stack>
      <Wrap p={[2, 4, 8, 16]} spacing={[2, 4, 8, 16]} justify={"center"}>
        <WrapItem>
          <Deposit />
        </WrapItem>
        <WrapItem>
          <Exchange />
        </WrapItem>
      </Wrap>
    </Stack>
  )
}

export default Bank
