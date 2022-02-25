import {
  Button, Collapse,
  Input, Spacer,
  Stack,
  Text, useDisclosure
} from "@chakra-ui/react";
import {Trans} from "@lingui/macro";
import {ChevronDownIcon} from "@chakra-ui/icons";

export const Deposit = () => {
  const {isOpen, onToggle} = useDisclosure()

  return (
    <Stack p={2} bg={"white"} color={"black"} w={'full'} maxW={'480px'} borderRadius={'2xl'} minH={'240px'}>
      <Stack>
        <Text fontWeight={'bold'} px={1}>
          <Trans>Deposit</Trans>
        </Text>
      </Stack>
      <Input variant='filled' height={'100px'}/>
      <Stack spacing={0}>
        <Button onClick={onToggle} variant={"ghost"} isActive={isOpen}>
          <Stack direction={"row"} w={"full"}>
            <Text>预计</Text>
            <Spacer />
            <ChevronDownIcon fontSize={'xl'}
                             style={{ transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)", transition: "all 0.2s linear" }} />
          </Stack>
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Stack p={4} mt={2} border={'1px solid'} borderColor={"inherit"} borderRadius={8}>
            <Text>预计获得</Text>
          </Stack>
        </Collapse>
      </Stack>
      <Button size={'xl'} height={'60px'}>
        Deposit
      </Button>
    </Stack>
  )
}

export default Deposit