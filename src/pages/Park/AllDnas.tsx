import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,Text,
  Drawer, useDisclosure, Wrap, Stack
} from "@chakra-ui/react";
import {AddNewDna} from "./AddNewDna";
import {useEffect, useState} from "react";
import {useYakYakClone} from "../../hooks/useYakYakClone";

export const AllDnas = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { nextDnaID } = useYakYakClone()
  const [dnas, setDnas] = useState<number[]>([])

  useEffect(() => {
    let arr = []
    for (let i = 1; i < nextDnaID; i++) {
      arr[i-1] = i;
    }
    setDnas(arr)
  }, [nextDnaID])

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
                {dnas.map((dnaID) => (
                  <Text key={dnaID}>DNA #{dnaID}</Text>
                ))}
              </Wrap>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}