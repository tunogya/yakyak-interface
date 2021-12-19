import {Heading, Spacer, Stack, Text} from "@chakra-ui/react";
import React from "react";

const Exchange = () => {
  return (
    <Stack bg={"blue.300"} w={"400px"} h={"600px"} p={[2, 4, 4, 8]} borderRadius={"20px"} spacing={[2, 4, 4, 8]}>
      <Stack>
        <Stack direction={"row"}>
          <Text color={"blue.700"} fontWeight={"bold"}>My wallet:</Text>
          <Spacer />
          <Text fontWeight={"bold"} color={"blue.700"}>200000000 YakYak®</Text>
        </Stack>
        <Stack direction={"row"}>
          <Text color={"blue.700"} fontWeight={"bold"}>My bank:</Text>
          <Spacer />
          <Text fontWeight={"bold"} color={"blue.700"}>0 YakYak®</Text>
        </Stack>
      </Stack>
      <Heading fontSize={"xl"}>Exchange Cheque</Heading>

    </Stack>
  )
}

export default Exchange