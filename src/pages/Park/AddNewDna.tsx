import {
  Button,
  FormControl, FormLabel,
  IconButton, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Stack, useDisclosure
} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";
import {useYakYakClone} from "../../hooks/useYakYakClone";
import {useState} from "react";
import {useYakYakCloneContract} from "../../hooks/useContract";

export const AddNewDna = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [state, setState] = useState(IDLE)
  const [metadata, setMetadata] = useState("")
  const {nextDnaID} = useYakYakClone()
  const yaklone = useYakYakCloneContract()


  return (
    <>
      <IconButton
        aria-label={"add"}
        variant={"outline"}
        borderRadius={"8px"}
        icon={<SmallAddIcon/>}
        onClick={onOpen}
        minW={"200px"}
        minH={"300px"}
        color={"gray"}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Add new dna</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Stack spacing={"24px"} bg={"white"} pb={"24px"} px={"12px"} borderRadius={"8px"}>
              <FormControl>
                <FormLabel>The next dna ID: #{nextDnaID}</FormLabel>
                <Input placeholder={"Input dna metadata"} onChange={(e) => setMetadata(e.target.value)}/>
              </FormControl>
              <Button
                isLoading={state === PROCESSING}
                disabled={metadata === ""}
                onClick={async () => {
                  setState(PROCESSING)
                  if (yaklone) {
                    const tx = await yaklone.createDna(metadata)
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