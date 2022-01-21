import {Select, Spacer, Stack, Text, Wrap} from "@chakra-ui/react";
import {useYakYakRewards} from "../../hooks/useYakYakRewards";
import {useActiveWeb3React} from "../../hooks/web3";
import {useCallback, useEffect, useState} from "react";
import {formatNumber} from "../../utils/bignumberUtil";
import {atom, useRecoilState} from "recoil";
import {SetItem} from "./SetItem";
import {AddNewSet} from "./AddNewSet";
import {useYakYakClone} from "../../hooks/useYakYakClone";
import {StartNewSeries} from "./StartNewSeries";
import {AllDnas} from "./AllDnas";

const balanceAtom = atom({
  key: "my:balance",
  default: "NaN",
})

export const Park = () => {
  const {account} = useActiveWeb3React()
  const {balanceOf} = useYakYakRewards()
  const [balance, setBalance] = useRecoilState(balanceAtom)
  const {currentSeries, sets, setSelectSeries, dnas} = useYakYakClone()
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

  const getControl = () => {
    return (
      <Stack h={"60px"} bg={"white"} alignItems={"center"} justifyContent={"center"}
             borderBottomWidth={"1px"} borderBottomColor={"divider"}>
        <Stack w={"full"} maxW={"1024px"} direction={"row"} alignItems={"center"} spacing={"60px"} fontSize={"14px"}>
          <Text fontWeight={"600"} color={"primary"}>YakYak Park</Text>
          <Stack direction={"row"} alignItems={"center"} spacing={0}>
            <Select w={"120px"} fontWeight={"400"} fontSize={"14px"}
                    onChange={(e) => {
                      setSelectSeries(Number(e.target.value))
                    }}>
              {series.map((seriesID) => (
                <option key={seriesID} value={seriesID}>Series {seriesID}</option>
              ))}
            </Select>
            <StartNewSeries/>
          </Stack>
          <Text fontSize={"14px"}>{balance} YKR</Text>
          <Spacer/>
          <AllDnas />
        </Stack>
      </Stack>
    )
  }

  const getSetList = () => {
    return (
      <Stack w={"full"} direction={"row"} alignItems={"center"} py={"8px"} maxW={"1024px"}>
        <AddNewSet/>
        <Stack direction={"row"} overflow={"scroll"}>
          {sets.map((setID) => (
            <SetItem key={setID} setID={setID}/>
          ))}
        </Stack>
      </Stack>
    )
  }

  const getDnaList = () => {
    return (
      <Stack w={"full"} maxW={"1024px"}>
        <Wrap justify={"start"}>
          {dnas.map((dnaID) => (
            <Text>DNA #{dnaID}</Text>
          ))}
        </Wrap>
      </Stack>
    )
  }

  return (
    <Stack w={"full"}>
      {getControl()}
      <Stack alignItems={"center"}>
        {getSetList()}
        {getDnaList()}
      </Stack>
    </Stack>
  )
}


export default Park