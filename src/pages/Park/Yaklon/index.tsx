import {Button, Input, Select, Stack, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {atom, useRecoilState} from "recoil";
import {useActiveWeb3React} from "../../../hooks/web3";
import {useYakYakRewards} from "../../../hooks/useYakYakRewards";
import {useYakYakClone} from "../../../hooks/useYakYakClone";
import {FC, useCallback, useEffect, useState} from "react";
import {formatNumber, parseToBigNumber} from "../../../utils/bignumberUtil";
import {SetItem} from "./SetItem";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../../../constants/misc";
import {useYakYakCloneContract} from "../../../hooks/useContract";
import {Controller} from "../Controller";

export const Yaklon = () => {
  const balanceAtom = atom({
    key: "my:balance",
    default: "NaN",
  })
  const {account} = useActiveWeb3React()
  const {balanceOf} = useYakYakRewards()
  const [balance, setBalance] = useRecoilState(balanceAtom)
  const {currentSeries, sets, setSelectSeries, dnas, selectSetID, totalSupply} = useYakYakClone()
  const [series, setSeries] = useState<number[]>([])

  useEffect(() => {
    let arr = []
    for (let i = 1; i <= currentSeries; i++) {
      arr[i] = i;
    }
    setSeries(arr)
  }, [currentSeries])

  const fetchYakBalance = useCallback(async () => {
    if (account) {
      setBalance(formatNumber(await balanceOf(account)))
    }
  }, [account, balanceOf, setBalance])

  useEffect(() => {
    fetchYakBalance()
  }, [fetchYakBalance])
  setInterval(fetchYakBalance, 3000)

  const getSetList = () => {
    return (
      <Stack w={"full"} direction={"row"} alignItems={"center"} py={"8px"} maxW={"1024px"}>
        <Stack direction={"row"} overflow={"scroll"}>
          {sets.map((setID) => (
            <SetItem key={setID} setID={setID}/>
          ))}
        </Stack>
      </Stack>
    )
  }

  const getTool = () => {
    return (
      <>
        <Stack direction={"row"} alignItems={"center"} spacing={0}>
          <Select w={"120px"} fontWeight={"400"} fontSize={"14px"}
                  onChange={(e) => {
                    setSelectSeries(Number(e.target.value))
                  }}>
            {series.map((seriesID) => (
              <option key={seriesID} value={seriesID}>Series {seriesID}</option>
            ))}
          </Select>
        </Stack>
        <Text fontSize={"14px"}>My Balance: {balance} YKR</Text>
        <Text>Yaklon Total Supply: {totalSupply}</Text>
      </>
    )
  }

  const getDnaList = () => {
    return (
      <Stack w={"full"} maxW={"1024px"}>
        <Wrap justify={"start"}>
          {dnas.map((dnaID) => (
            <Item setID={selectSetID} dnaID={dnaID} key={dnaID}/>
          ))}
        </Wrap>
      </Stack>
    )
  }

  return (
    <>
      <Controller tool={getTool()} />
      {getSetList()}
      {getDnaList()}
    </>
  )
}

type ItemProps = {
  setID: number
  dnaID: number
}

export const Item: FC<ItemProps> = ({...props}) => {
  const [state, setState] = useState(IDLE)
  const yakyak = useYakYakCloneContract()
  const [count, setCount] = useState(0)
  const {fetchState} = useYakYakClone()

  return (
    <WrapItem>
      <Stack boxShadow={"xs"} p={"12px"} w={"200px"} h={"300px"} borderRadius={"8px"}>
        <Text>DNA #{props.dnaID}</Text>
        <Button
          isLoading={state === PROCESSING}
          onClick={async () => {
            if (!yakyak) return
            setState(PROCESSING)
            const tx = await yakyak.cloning(props.setID, props.dnaID, {
              value: parseToBigNumber(0.01).shiftedBy(18).toFixed(0),
            })
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
          }}>Clone</Button>
        <Input onChange={(e) => {
          setCount(Number(e.target.value))
        }}/>
        <Button
          isLoading={state === PROCESSING}
          onClick={async () => {
            if (!yakyak) return
            setState(PROCESSING)
            const tx = await yakyak.batchCloning(props.setID, props.dnaID, count, {
              value: parseToBigNumber(0.01).shiftedBy(18).multipliedBy(count).toFixed(0)
            })
            const res = await tx.wait()
            if (res.status === 1) {
              setState(SUCCESS)
              await fetchState()
              setTimeout(() => {
                setState(IDLE)
              }, IDLE_DELAY)
            } else {
              setState(ERROR)
              await fetchState()
              setTimeout(() => {
                setState(IDLE)
              }, IDLE_DELAY)
            }
          }}>
          Batch Clone
        </Button>
      </Stack>
    </WrapItem>
  )
}

export default Yaklon

