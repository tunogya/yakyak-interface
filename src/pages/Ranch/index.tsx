import { Heading, Stack } from "@chakra-ui/react"
import React from "react"

const Ranch = () => {
  return (
    <Stack w={"full"} h={"full"}>
      <Stack h={"72px"} w={"full"} bg={"blue.300"} alignItems={"center"} justifyContent={"center"}>
        <Heading fontSize={"2xl"}>YakYak® Ranch</Heading>
      </Stack>
    </Stack>
  )
}

export default Ranch
