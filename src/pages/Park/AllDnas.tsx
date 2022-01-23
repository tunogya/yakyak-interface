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
import {FC, useEffect, useState} from "react";
import {useYakYakClone} from "../../hooks/useYakYakClone";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../constants/misc";

export const AllDnas = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {nextDnaID} = useYakYakClone()
  const [dnas, setDnas] = useState<number[]>([])

  useEffect(() => {
    let arr = []
    for (let i = 1; i < nextDnaID; i++) {
      arr[i - 1] = i;
    }
    setDnas(arr)
  }, [nextDnaID])

  return (
    <>
      <Button onClick={onOpen} variant={"outline"} color={"primary"} fontSize={"sm"} maxH={"40px"} borderRadius={"8px"}>
        All DNAs
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={"xl"}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader>
            <Stack direction={"row"} alignItems={"center"} spacing={"24px"}>
              <Text>All DNAs</Text>
              <Input placeholder='Search...' w={"300px"}/>
              <AddNewDna/>
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={"12px"}>
              <Wrap justify={"start"} spacing={"12px"}>
                {dnas.map((dnaID) => (
                  <Item key={dnaID} dnaID={dnaID}/>
                ))}
              </Wrap>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

type ItemProps = {
  dnaID: number
}

export const Item: FC<ItemProps> = ({...props}) => {
  const [setID, setSetID] = useState('')
  const yakyak = useYakYakCloneContract()
  const [state, setState] = useState(IDLE)

  return (
    <WrapItem>
      <Stack boxShadow={"xs"} p={"12px"} w={"200px"} h={"300px"} borderRadius={"8px"}>
        <Image src={"https://www.mxyn.com/mimg/aimg/1902/2-1Z219223P1914.jpg"} objectFit={"cover"}
               fallbackSrc='https://via.placeholder.com/150'/>
        <Text>DNA #{props.dnaID}</Text>
        <Input onChange={(e) => {
          setSetID(e.target.value)
        }}/>
        <Button
          disabled={setID === ''}
          isLoading={state === PROCESSING}
          onClick={async () => {
            if (!yakyak) return
            setState(PROCESSING)
            const tx = await yakyak.addDnaToSet(setID, props.dnaID)
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
          }}>
          Add to Set
        </Button>
      </Stack>
    </WrapItem>
  )
}