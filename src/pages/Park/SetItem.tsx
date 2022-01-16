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
    <Stack fontSize={"xs"} bg={locked ? "gray" : "white"} p={"20px"} borderRadius={"8px"} minW={"140px"}>
      <Text>#{props.setID}</Text>
      <Text>{name}</Text>
    </Stack>
  )
}