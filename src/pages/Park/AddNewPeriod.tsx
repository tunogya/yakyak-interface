import {Button, Input, Stack} from "@chakra-ui/react";
import {parseToBigNumber} from "../../utils/bignumberUtil";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {useState} from "react";

export const AddNewPeriod = () => {
  const yaklone = useYakYakCloneContract()

  const [name, setName] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  return (
    <Stack w={"full"} maxW={"300px"} py={"12px"} spacing={"20px"} bg={"white"} p={"30px"} borderRadius={"8px"}>
      <Input placeholder={"Input Period Name"} onChange={(e) => setName(e.target.value)}/>
      <Input placeholder={"Input Period Start Time"} onChange={(e) => setStart(e.target.value)}/>
      <Input placeholder={"Input Period End Time"} onChange={(e) => setEnd(e.target.value)}/>
      <Button
        onClick={async () => {
          if (yaklone) {
            const tx = await yaklone.createPeriod(name, parseToBigNumber(start).shiftedBy(6).toFixed(0), parseToBigNumber(end).shiftedBy(6).toFixed(0))
            const res = await tx.wait()
            console.log(res)
          }
        }}
      >Create new Period</Button>
    </Stack>
  )
}