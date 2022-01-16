import {Button, Input, Stack} from "@chakra-ui/react";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {useState} from "react";

export const AddNewSet = () => {
  const yaklone = useYakYakCloneContract()

  const [name, setName] = useState('')

  return (
    <Stack w={"full"} maxW={"300px"} py={"12px"} spacing={"20px"} bg={"white"} p={"30px"} borderRadius={"8px"}>
      <Input placeholder={"Input Period Name"} onChange={(e) => setName(e.target.value)}/>
      <Button
        onClick={async () => {
          if (yaklone) {
            const tx = await yaklone.createSet(name)
            const res = await tx.wait()
            console.log(res)
          }
        }}
      >Create new Set</Button>
    </Stack>
  )
}