import {Input, Select, Spacer, Stack, Text} from "@chakra-ui/react";
import {useYakYakRewards} from "../../hooks/useYakYakRewards";
import {useActiveWeb3React} from "../../hooks/web3";
import {useCallback, useEffect, useState} from "react";
import {formatNumber, parseToBigNumber} from "../../utils/bignumberUtil";
import {atom, useRecoilState} from "recoil";
import {SetItem} from "./SetItem";
import {AddNewSet} from "./AddNewSet";
import {useYakYakCloneContract} from "../../hooks/useContract";
import {BigNumber} from "ethers";
import {useYakYakClone} from "../../hooks/useYakYakClone";

const balanceAtom = atom({
  key: "my:balance",
  default: "NaN",
})

export const Park = () => {
  const {account} = useActiveWeb3React()
  const {balanceOf} = useYakYakRewards()
  const [balance, setBalance] = useRecoilState(balanceAtom)
  const yaklon = useYakYakCloneContract()
  const {currentSeries} = useYakYakClone()
  const [series, setSeries] = useState<number[]>([])
  const [sets, setSets] = useState<number[]>([])

  useEffect(() => {
    let arr = []
    for (let i = 1; i <= currentSeries; i++) {
      arr[i] = i;
    }
    setSeries(arr)
  }, [currentSeries])

  const refresh = useCallback(async () => {
    if (account) {
      setBalance(formatNumber(await balanceOf(account)))
    }
  }, [account, balanceOf, setBalance])

  const fetchSets = useCallback(async (series: number)=>{
    if (yaklon) {
      const res = await yaklon.getSeriesSet(series)
      const list = res.filter((setID: BigNumber)=> (!setID.eq(0))).map((setID: BigNumber)=>(
        parseToBigNumber(setID).toNumber()
      ))
      setSets(list)
    }
  }, [yaklon])

  useEffect(()=>{
    fetchSets(1)
  }, [fetchSets])

  useEffect(() => {
    refresh()
  }, [refresh])

  const control = () => {
    return (
      <Stack h={"60px"} bg={"white"} alignItems={"center"} justifyContent={"center"}
             borderBottomWidth={"1px"} borderBottomColor={"divider"}>
        <Stack w={"full"} maxW={"1024px"} direction={"row"} alignItems={"center"} spacing={"60px"}>
          <Text fontSize={"14px"} fontWeight={"600"} color={"primary"}>YakYak Park</Text>
          <Select w={"120px"}>
            { series.map((seriesID)=>(
              <option key={seriesID} value='series1'>Series {seriesID}</option>
            )) }
          </Select>
          <Text fontSize={"14px"}>{balance} YKR </Text>
          <Spacer/>
          <Input w={"200px"} placeholder={"Search"}/>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack w={"full"}>
      {control()}
      <Stack alignItems={"center"}>
        <Stack direction={"row"} alignItems={"center"} py={"8px"}>
          <Stack direction={"row"} overflow={"scroll"} maxW={"1024px"}>
            {sets.map((setID) => (
              <SetItem key={setID} setID={setID}/>
            ))}
          </Stack>
          <AddNewSet/>
        </Stack>
      </Stack>
    </Stack>
  )
}


export default Park