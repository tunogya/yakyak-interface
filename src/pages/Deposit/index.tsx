import {
  Button, Collapse,
  Input, InputGroup, InputLeftElement, Select, Spacer,
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
        <Text fontWeight={'bold'} px={2}>
          <Trans>Deposit</Trans>
        </Text>
      </Stack>
      <InputGroup h={24}>
        <InputLeftElement children={
          <Select variant='filled' size={'lg'} fontWeight={"bold"}>
            <option value='eth'>
              ETH
            </option>
            <option value='usdt'>USDT</option>
          </Select>
        } h={24} w={32} pl={3}/>
        <Input placeholder='0.0' h={24} pl={'148px'} textAlign={"right"} fontSize={'4xl'} fontWeight={"bold"}/>
      </InputGroup>
      <Stack spacing={0}>
        <Button onClick={onToggle} variant={"ghost"} isActive={isOpen}>
          <Stack direction={"row"} w={"full"}>
            <Text>年利率</Text>
            <Spacer />
            <ChevronDownIcon fontSize={'xl'}
                             style={{ transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)", transition: "all 0.2s linear" }} />
          </Stack>
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Stack p={4} mt={2} border={'1px solid'} borderColor={"inherit"} borderRadius={8} fontSize={'sm'}>
            <Text>预计获得</Text>
          </Stack>
        </Collapse>
      </Stack>
      <Button size={'xl'} height={16}>
        Deposit
      </Button>
    </Stack>
  )
}

export default Deposit