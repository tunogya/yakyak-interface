import {Stack, WrapItem, Center, Wrap} from "@chakra-ui/react";

export const More = () => {
  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Wrap spacing='30px' justify={"center"}>
        <WrapItem>
          <Center w='240px' h='240px' bg='red.200'>
            Box 1
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w='240px' h='240px' bg='green.200'>
            Box 2
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w='240px' h='240px' bg='tomato'>
            Box 3
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w='240px' h='240px' bg='blue.200'>
            Box 4
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w='240px' h='240px' bg='blue.200'>
            Box 5
          </Center>
        </WrapItem>
        <WrapItem>
          <Center w='240px' h='240px' bg='blue.200'>
            Box 4
          </Center>
        </WrapItem>
      </Wrap>
    </Stack>
  )
}