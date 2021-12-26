import {Stack, Text} from "@chakra-ui/react";

export const Pay = () => {
  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Stack flex={"0 0 60%"} bg={"white"} maxW={"60%"} p={"30px"}>
        <Text fontSize={"20px"}>Send YakYak® Rewards</Text>
      </Stack>
      <Stack flex={"0 0 40%"} maxW={"40%"}>

      </Stack>
    </Stack>
  )
}