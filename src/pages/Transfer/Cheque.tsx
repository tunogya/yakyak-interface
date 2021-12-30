import {Text, Stack, NumberInput, NumberInputField, Button, Code} from "@chakra-ui/react"
import {useState} from "react";
import {useCheque} from "../../hooks/useCheque";
import {useGA4React} from "ga-4-react";

export const Cheque = () => {
  const format = (val: string) => val + ' YakYak®'
  const parse = (val: string) => val.replace(/^D/g, '')
  const [amount, setAmount] = useState('0')
  const {sign, chequeList} = useCheque()
  const ga4 = useGA4React()

  const createForm = () => {
    return (
      <Stack bg={"white"} p={"30px"} spacing={"32px"} borderRadius={"8px"}>
        <Text fontSize={"20px"}>Create a cheque</Text>
        <NumberInput
          onChange={(valueString) => setAmount(parse(valueString))}
          onFocus={(e) => {
            e.target.setSelectionRange(0, amount.length)
          }}
          value={format(amount)}
          min={0}
        >
          <NumberInputField/>
        </NumberInput>
        <Stack direction={"row"}>
          <Button variant={"outline"} disabled={amount === '0'}
                  onClick={() => {
                    if (ga4) {
                      ga4.event("sign_cheque", "cheque", "cheque")
                    }
                    sign(amount)
                  }}>
            Next
          </Button>
        </Stack>
      </Stack>
    )
  }

  const recentlyCheques = () => {
    return (
      <Stack>
        <Text fontWeight={"bold"}>Recently Cheques</Text>
        <Stack spacing={3}>
          {
            chequeList.map((cheque)=>(
              <Code key={cheque.id} p={"24px"} bg={"white"} color={"primary"} fontSize={"12px"}
                    borderRadius={"8px"}>
                {JSON.stringify(cheque)}
              </Code>
            ))
          }
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Stack flex={"0 0 60%"} maxW={"60%"} spacing={"30px"}>
        {createForm()}
        {recentlyCheques()}
      </Stack>
      <Stack flex={"0 0 40%"} maxW={"40%"} px={"30px"} py={"10px"} fontWeight={"bold"}>
        <Text>Invite your friends</Text>
        <Text>Send to bank account</Text>
        <Text>Send and receive donations</Text>
      </Stack>
    </Stack>
  )
}