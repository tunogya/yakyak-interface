import {Stack, WrapItem, Center, Wrap} from "@chakra-ui/react";

export const More = () => {
  const list = [
    {label: 'Invite your friends', action: '', element: <></>},
    {label: 'Send to bank account', action: '', element: <></>},
    {label: 'Send a cheque', action: '', element: <></>},
    {label: 'Send and receive donations', action: '', element: <></>},
  ]

  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Wrap spacing='30px' justify={"center"}>
        { list.map((item)=>(
          <WrapItem>
            <Center w='240px' h='240px' bg='white' borderRadius={'8px'}>
              {item.label}
            </Center>
          </WrapItem>
        )) }
      </Wrap>
    </Stack>
  )
}