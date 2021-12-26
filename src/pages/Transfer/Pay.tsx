import {Button, Input, Stack, Text} from "@chakra-ui/react";

export const Pay = () => {
  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Stack flex={"0 0 60%"} bg={"white"} maxW={"60%"} p={"30px"} spacing={"32px"} borderRadius={"8px"}>
        <Text fontSize={"20px"}>Send YakYak® Rewards</Text>
        <Input />
        <Stack direction={"row"}>
          <Button variant={"outline"}>
            Next
          </Button>
        </Stack>
      </Stack>
      <Stack flex={"0 0 40%"} maxW={"40%"} px={"30px"} py={"10px"} fontWeight={"bold"}>
        <Text>Invite your friends</Text>
        <Text>Send to bank account</Text>
        <Text>Send cash for pick up</Text>
        <Text>Send an invoice</Text>
        <Text>Send and receive donations</Text>
      </Stack>
    </Stack>
  )
}