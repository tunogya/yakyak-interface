import {Stack, WrapItem, Center, Wrap} from "@chakra-ui/react";

export const More = () => {
  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Wrap spacing='30px' justify={"center"}>
        <WrapItem>
          <Center w='240px' h='240px' bg='white' borderRadius={'8px'}>
            Box 1
          </Center>
        </WrapItem>
      </Wrap>
    </Stack>
  )
}