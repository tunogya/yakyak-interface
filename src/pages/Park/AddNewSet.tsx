import {
  Button, FormControl, FormLabel,
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

export const AddNewSet = () => {
  const yaklone = useYakYakCloneContract()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [name, setName] = useState('')
  const [state, setState] = useState(IDLE)
  const {nextSetID} = useYakYakClone()

  return (
    <>
      <Button onClick={onOpen} size={"sm"}>Add new Set</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Create new Set</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Stack spacing={"24px"} bg={"white"} pb={"24px"} px={"12px"} borderRadius={"8px"}>
              <FormControl>
                <FormLabel>Next Set's ID: #{nextSetID}</FormLabel>
                <Input placeholder={"Input Period Name"} onChange={(e) => setName(e.target.value)}/>
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
                      setTimeout(() => {
                        setState(IDLE)
                      }, IDLE_DELAY)
                    } else {
                      setState(ERROR)
                      setTimeout(() => {
                        setState(IDLE)
                      }, IDLE_DELAY)
                    }
                  }
                }}
              >Create new Set</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  )
}