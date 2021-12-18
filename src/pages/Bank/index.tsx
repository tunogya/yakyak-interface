import {Heading, Stack, Text, Input} from "@chakra-ui/react";
import React, {FC} from "react";

const Bank = () => {
  return (
    <Stack w={"full"} h={"full"}>
      <Stack h={"72px"} w={"full"} bg={"blue.300"} alignItems={"center"} justifyContent={"center"}>
        <Heading fontSize={"2xl"}>YakYak® Bank</Heading>
      </Stack>
      <Stack direction={"row"} px={32} py={8} justifyContent={"space-between"}>
        <Stack spacing={16}>
          <Stack spacing={8}>
            <BankFormTitle id={"01"} title={"Deposit funds to the bank"}/>
            <Input variant={"filled"}/>
          </Stack>



          <BankFormTitle id={"02"} title={"Sign cheque"}/>


        </Stack>
        <Stack bg={"blue.300"} w={"400px"} h={"600px"} p={8} borderRadius={"20px"}>
          <Text>exchange</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

type BankFormTitleProps = {
  id?: string | number
  title: string
}

const BankFormTitle: FC<BankFormTitleProps> = ({...props}) => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Heading fontSize={"xl"} color={"blue.500"}>{props.id}</Heading>
      <Heading fontSize={"xl"} color={"blue.700"}>{props.title}</Heading>
    </Stack>
  )
}

export default Bank
