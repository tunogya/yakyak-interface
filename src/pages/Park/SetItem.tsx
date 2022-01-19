import {FC, useCallback, useEffect, useState} from "react";
import {Stack, Text} from "@chakra-ui/react";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {useYakYakClone} from "../../hooks/useYakYakClone";
import {useNavigate} from "react-router-dom";

type PeriodItemProps = {
  setID: number
}

export const SetItem: FC<PeriodItemProps> = ({...props}) => {
  const yaklon = useYakYakCloneContract()
  const [name, setName] = useState('')
  const [locked, setLocked] = useState(false)
  const {selectSetID, setSelectSetID, selectSeries} = useYakYakClone()
  const navigate = useNavigate()

  const fetch = useCallback(async () => {
    if (yaklon) {
      const res = await yaklon.getSetData(props.setID)
      setName(res.name)
      setLocked(res.isLocked)
    }
  }, [props.setID, yaklon])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <Stack direction={"row"} fontSize={"xs"} p={"12px"} pb={"20px"} bg={selectSetID === props.setID ? "primary" : "white"}
           fontWeight={"600"} borderRadius={"8px"} w={"120px"} color={selectSetID === props.setID ? "white" : "black"}
           cursor={"pointer"}
           onClick={() => {
             setSelectSetID(props.setID)
             navigate(`/shopping?series=${selectSeries}&setID=${props.setID}`)
           }}>
      <Text>{name}</Text>
      <Text color={selectSetID === props.setID ? "white" : "gray"}>#{props.setID}</Text>
    </Stack>
  )
}