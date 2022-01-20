import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Drawer, useDisclosure, Wrap, Stack
} from "@chakra-ui/react";
import {AddNewDna} from "./AddNewDna";

export const AllDnas = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} variant={"outline"} color={"primary"} fontSize={"sm"}>
        All DNAs
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={"xl"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>All DNAs</DrawerHeader>
          <DrawerBody>
            <Stack spacing={"12px"}>
              <Input placeholder='Search...' />
              <Wrap justify={"start"}>
                <AddNewDna/>
                {/*{dnas.map((dnaID) => (*/}
                {/*  <Text>DNA #{dnaID}</Text>*/}
                {/*))}*/}
              </Wrap>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}