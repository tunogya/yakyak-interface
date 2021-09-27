import {Trans} from "@lingui/macro";
import {
  Button,
  Modal,
  ModalBody, ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Stack,
  useDisclosure
} from "@chakra-ui/react";

export const WalletConnect = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button size={"md"} onClick={onOpen}><Trans>Connect Wallet</Trans></Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><Trans>Connect wallet</Trans></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack pb={4}>
              <Button isFullWidth={true} size={"lg"}>MetaMask</Button>
              <Button isFullWidth={true} size={"lg"}>WalletConnect</Button>
              <Button isFullWidth={true} size={"lg"}>Coinbase Wallet</Button>
              <Button isFullWidth={true} size={"lg"}>Fortmatic</Button>
              <Button isFullWidth={true} size={"lg"}>Portis</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WalletConnect