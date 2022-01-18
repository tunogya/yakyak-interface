import {
  Button, FormControl, FormLabel, IconButton,
  Input, Modal,
  ModalBody, ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {useState} from "react";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";
import {useYakYakClone} from "../../hooks/useYakYakClone";
import {SmallAddIcon} from "@chakra-ui/icons";

export const AddNewSet = () => {
  const yaklone = useYakYakCloneContract()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [name, setName] = useState('')
  const [state, setState] = useState(IDLE)
  const {nextSetID, fetchSets} = useYakYakClone()

  return (
    <>
      <Stack h={"40px"} w={"40px"}>
        <IconButton aria-label={"add"} icon={<SmallAddIcon/>} onClick={onOpen}/>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Create new set</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Stack spacing={"24px"} bg={"white"} pb={"24px"} px={"12px"} borderRadius={"8px"}>
              <FormControl>
                <FormLabel>The next set ID: #{nextSetID}</FormLabel>
                <Input placeholder={"Input set name"} onChange={(e) => setName(e.target.value)}/>
              </FormControl>
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
                      await fetchSets()
                      setTimeout(() => {
                        setState(IDLE)
                      }, IDLE_DELAY)
                    } else {
                      setState(ERROR)
                      await fetchSets()
                      setTimeout(() => {
                        setState(IDLE)
                      }, IDLE_DELAY)
                    }
                  }
                  onClose()
                }}
              >Create</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  )
}