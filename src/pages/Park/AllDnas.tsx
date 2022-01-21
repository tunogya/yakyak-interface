import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input, Text,
  Drawer, useDisclosure, Wrap, Stack, WrapItem, Image
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
          <DrawerHeader>
            <Stack direction={"row"} alignItems={"center"} spacing={"24px"}>
              <Text>All DNAs</Text>
              <Input placeholder='Search...' w={"300px"} />
              <AddNewDna/>
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={"12px"}>
              <Wrap justify={"start"} spacing={"12px"}>
                {dnas.map((dnaID) => (
                  <WrapItem key={dnaID} boxShadow={"xs"} p={"12px"} w={"200px"} h={"300px"} borderRadius={"8px"}>
                    <Stack>
                      <Image src={"https://www.mxyn.com/mimg/aimg/1902/2-1Z219223P1914.jpg"} objectFit={"cover"} fallbackSrc='https://via.placeholder.com/150'/>
                      <Text>DNA #{dnaID}</Text>
                    </Stack>
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}