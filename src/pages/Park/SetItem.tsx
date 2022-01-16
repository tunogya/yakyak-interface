import {FC, useCallback, useEffect, useState} from "react";
import {Stack, Text} from "@chakra-ui/react";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {formatNumber, parseToBigNumber} from "../../utils/bignumberUtil";

type PeriodItemProps = {
  setID: number
}

export const SetItem: FC<PeriodItemProps> = ({...props}) => {
  const yaklon = useYakYakCloneContract()
  const [name, setName] = useState('')
  const [locked, setLocked] = useState(false)
  const [series, setSeries] = useState(0)

  const fetch = useCallback(async () => {
    if (yaklon){
      const res = await yaklon.getSetData(props.setID)
      setName(res.name)
      setLocked(res.isLocked)
      setSeries(res.series)
    }
  }, [props.setID, yaklon])

  useEffect(()=>{
    fetch()
  }, [fetch])

  return (
    <Stack fontSize={"xs"} bg={locked ? "gray" : "white"} p={"20px"} borderRadius={"8px"}>
      <Text>Set ID: {props.setID}</Text>
      <Text>Series: {formatNumber(parseToBigNumber(series).toFixed(0))}</Text>
      <Text>Name: {name}</Text>
    </Stack>
  )
}