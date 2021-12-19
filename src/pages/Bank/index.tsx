import {Heading, Stack, Text, Button, NumberInput, NumberInputField} from "@chakra-ui/react";
import React, {FC, useState} from "react";

const Bank = () => {
  const format = (val: string) => val + ' YakYak®'
  const parse = (val: string) => val.replace(/[a-zA-Z\s]+/g, '')
  const [approved, setApproved] = useState(false)

  const [value, setValue] = React.useState('0')

  return (
    <Stack w={"full"} h={"full"}>
      <Stack h={"72px"} w={"full"} bg={"blue.300"} alignItems={"center"} justifyContent={"center"}>
        <Heading fontSize={"2xl"}>YakYak® Bank</Heading>
      </Stack>
      <Stack direction={"row"} p={[2, 4, 8, 16]} justifyContent={"space-between"} spacing={[2, 4, 8, 16]}>
        <Stack spacing={16}>
          <Stack spacing={8}>
            <BankFormTitle id={"00"} title={"Deposit funds to the bank (Option)"}/>
            <NumberInput variant={"filled"} min={0}
                         onChange={(valueString) => setValue(parse(valueString))}
                         onFocus={(e) => {
                           e.target.setSelectionRange(0, value.length)
                         }}
                         value={format(value)}
            >
              <NumberInputField/>
            </NumberInput>
              { !approved ? (
                <Button isFullWidth variant={"outline"}>
                  Approve First
                </Button>
              ) : (
                <Button isFullWidth>
                  Deposit
                </Button>
              ) }
          </Stack>

          <Stack spacing={8}>
            <BankFormTitle id={"01"} title={"Set cheque id"}/>
            <NumberInput variant={"filled"} min={0}>
              <NumberInputField/>
            </NumberInput>
          </Stack>

          <Stack spacing={8}>
            <BankFormTitle id={"02"} title={"Set cheque amount"}/>
            <NumberInput variant={"filled"} min={0}>
              <NumberInputField/>
            </NumberInput>
          </Stack>

          <Stack spacing={8}>
            <BankFormTitle id={"03"} title={"Sign cheque"}/>
            <Button>
              Sign
            </Button>
          </Stack>





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
