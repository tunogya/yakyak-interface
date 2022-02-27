import {Button, Spacer, Stack, Text} from "@chakra-ui/react";
import {RepeatIcon} from "@chakra-ui/icons";

export const Account = () => {
  return (
    <Stack w={'full'} maxW={'480px'} h={'200px'}>
      <Stack direction={"row"} px={2}>
        <Text fontWeight={"bold"}>Deposits</Text>
        <Spacer/>
        <RepeatIcon/>
      </Stack>

      <Stack bg={"white"} borderRadius={'md'} px={2} py={6}>
        <Button variant={"outline"} color={'black'} borderColor={'gray.200'} border={'1px solid'}>
          <Stack direction={"row"} w={"full"} alignItems={"center"}>
            <Text fontWeight={'bold'}>Ethereum</Text>
            <Spacer />
            <Text>$0.0</Text>
          </Stack>
        </Button>
        <Button variant={"outline"} color={'black'} borderColor={'gray.200'} border={'1px solid'}>
          <Stack direction={"row"} w={"full"} alignItems={"center"}>
            <Text fontWeight={'bold'}>Polygon</Text>
            <Spacer />
            <Text>$0.0</Text>
          </Stack>
        </Button>
      </Stack>
      <Text fontWeight={"bold"} px={2}>YAK Token</Text>
      <Stack bg={"white"} borderRadius={'md'} mb={2}>
      </Stack>
      <Text fontWeight={"bold"} px={2}>Stake</Text>
      <Stack bg={"white"} borderRadius={'md'}>

      </Stack>
    </Stack>
  )
}

export default Account