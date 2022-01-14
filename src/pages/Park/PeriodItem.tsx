import {FC, useCallback, useEffect, useState} from "react";
import {Stack, Text} from "@chakra-ui/react";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {formatNumber, parseToBigNumber} from "../../utils/bignumberUtil";

type PeriodItemProps = {
  periodID: number
}

export const PeriodItem: FC<PeriodItemProps> = ({...props}) => {
  const yaklon = useYakYakCloneContract()
  const [name, setName] = useState('')
  const [locked, setLocked] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [series, setSeries] = useState(0)

  const fetch = useCallback(async () => {
    if (yaklon){
      const res = await yaklon.getPeriodData(props.periodID)
      setName(res.name)
      setLocked(res.isLocked)
      setStart(res.start)
      setEnd(res.end)
      setSeries(res.series)
    }
  }, [props.periodID, yaklon])

  useEffect(()=>{
    fetch()
  }, [fetch])

  return (
    <Stack fontSize={"xs"} bg={locked ? "gray" : "white"} p={"20px"} borderRadius={"8px"}>
      <Text>Period ID: {props.periodID}</Text>
      <Text>Series: {formatNumber(parseToBigNumber(series).toFixed(0))}</Text>
      <Text>Name: {name}</Text>
      <Text>Start: {formatNumber(parseToBigNumber(start))}</Text>
      <Text>End: {formatNumber(parseToBigNumber(end))}</Text>
    </Stack>
  )
}