import {
  Button,
  FormControl, FormLabel,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Stack, useDisclosure
} from "@chakra-ui/react";
import {ArrowUpIcon} from "@chakra-ui/icons";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";
import {useState} from "react";
import {useYakYakClone} from "../../hooks/useYakYakClone";

export const StartNewSeries = () => {
  const yaklone = useYakYakCloneContract()
  const [state, setState] = useState(IDLE)
  const {fetchState, currentSeries} = useYakYakClone()
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <IconButton
        isLoading={state === PROCESSING}
        aria-label={"add"}
        icon={<ArrowUpIcon/>}
        variant={"ghost"}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Create new set</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Stack spacing={"24px"} bg={"white"} pb={"24px"} px={"12px"} borderRadius={"8px"}>
              <FormControl>
                <FormLabel>Current series ID: #{currentSeries}</FormLabel>
              </FormControl>
              <Button
                isLoading={state === PROCESSING}
                onClick={async () => {
                  if (!yaklone) return
                  const tx = await yaklone.startNewSeries()
                  const res = await tx.wait()
                  if (res.status === 1) {
                    setState(SUCCESS)
                    await fetchState()
                    setTimeout(() => {
                      setState(IDLE)
                    }, IDLE_DELAY)
                  } else {
                    setState(ERROR)
                    await fetchState()
                    setTimeout(() => {
                      setState(IDLE)
                    }, IDLE_DELAY)
                  }
                }}
              >New Series</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
