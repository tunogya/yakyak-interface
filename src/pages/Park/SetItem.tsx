import {FC, useCallback, useEffect, useState} from "react";
import {Stack, Text} from "@chakra-ui/react";
import {useYakYakCloneContract} from "../../hooks/useContract";

type PeriodItemProps = {
  setID: number
}

export const SetItem: FC<PeriodItemProps> = ({...props}) => {
  const yaklon = useYakYakCloneContract()
  const [name, setName] = useState('')
  const [locked, setLocked] = useState(false)

  const fetch = useCallback(async () => {
    if (yaklon){
      const res = await yaklon.getSetData(props.setID)
      setName(res.name)
      setLocked(res.isLocked)
    }
  }, [props.setID, yaklon])

  useEffect(()=>{
    fetch()
  }, [fetch])

  return (
    <Stack direction={"row"} fontSize={"xs"} bg={locked ? "gray" : "white"} p={"12px"} pb={"20px"}
           fontWeight={"600"} borderRadius={"8px"} w={"120px"}>
      <Text>{name}</Text>
      <Text color={"gray"}>#{props.setID}</Text>
    </Stack>
  )
}