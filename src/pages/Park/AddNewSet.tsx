import {Button, Input, Stack} from "@chakra-ui/react";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {useState} from "react";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";

export const AddNewSet = () => {
  const yaklone = useYakYakCloneContract()
  const [name, setName] = useState('')
  const [state, setState] = useState(IDLE)

  return (
    <Stack w={"full"} maxW={"300px"} py={"12px"} spacing={"20px"} bg={"white"} p={"30px"} borderRadius={"8px"}>
      <Input placeholder={"Input Period Name"} onChange={(e) => setName(e.target.value)}/>
      <Button
        isLoading={state === PROCESSING}
        disabled={name === ""}
        onClick={async () => {
          setState(PROCESSING)
          if (yaklone) {
            const tx = await yaklone.createSet(name)
            const res = await tx.wait()
            if (res.status === 1) {
              setState(SUCCESS)
              setTimeout(()=>{
                setState(IDLE)
              }, IDLE_DELAY)
            } else {
              setState(ERROR)
              setTimeout(()=>{
                setState(IDLE)
              }, IDLE_DELAY)
            }
          }
        }}
      >Create new Set</Button>
    </Stack>
  )
}