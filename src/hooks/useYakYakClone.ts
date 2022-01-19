import {useCallback, useEffect} from "react";
import {useYakYakCloneContract} from "./useContract";
import {parseToBigNumber} from "../utils/bignumberUtil";
import {BigNumber} from "ethers";
import {atom, useRecoilState} from "recoil";

const totalSupplyAtom = atom({
  key: "yaklon:totalSupply",
  default: 0
})

const nextDnaIDAtom = atom({
  key: "yaklon:nextDnaID",
  default: 1
})

const nextSetIDAtom = atom({
  key: "yaklon:nextSetID",
  default: 1
})

const currentSeriesAtom = atom({
  key: "yaklon:currentSeries",
  default: 1
})

const selectSeriesAtom = atom({
  key: "yaklon:selectSeries",
  default: 1
})

const baseURIAtom = atom({
  key: "yaklon:baseURI",
  default: ""
})

const defaultSets: number[] = []

const setsAtom = atom({
  key: "yaklon:sets",
  default: defaultSets
})

const selectSetAtom = atom({
  key: "yaklon:selectSet",
  default: 1
})

export const useYakYakClone = () => {
  const [totalSupply, setTotalSupply] = useRecoilState(totalSupplyAtom)
  const [nextDnaID, setNextDnaID] = useRecoilState(nextDnaIDAtom)
  const [nextSetID, setNextSetID] = useRecoilState(nextSetIDAtom)
  const [currentSeries, setCurrentSeries] = useRecoilState(currentSeriesAtom)
  const [selectSeries, setSelectSeries] = useRecoilState(selectSeriesAtom)
  const [selectSetID, setSelectSetID] = useRecoilState(selectSetAtom)
  const [baseURI, setBaseURI] = useRecoilState(baseURIAtom)
  const [sets, setSets] = useRecoilState(setsAtom)
  const yaklon = useYakYakCloneContract()

  const fetchState = useCallback(async ()=> {
    if (!yaklon) return
    setCurrentSeries(parseToBigNumber((await yaklon.getState()).currentSeries).toNumber())
    setNextSetID(parseToBigNumber((await yaklon.getState()).nextSetID).toNumber())
    setNextDnaID(parseToBigNumber((await yaklon.getState()).nextDnaID).toNumber())
    setTotalSupply(parseToBigNumber(await yaklon.totalSupply()).toNumber())
    setBaseURI(await yaklon.getBaseURI())
  }, [setBaseURI, setCurrentSeries, setNextDnaID, setNextSetID, setTotalSupply, yaklon])

  const fetchSets = useCallback(async ()=>{
    if (!yaklon) return
    const res = await yaklon.getSeriesSet(selectSeries)
    setSets(res.filter((setID: BigNumber) => (!setID.eq(0))).map((setID: BigNumber) => (
      parseToBigNumber(setID).toNumber()
    )))
  }, [selectSeries, setSets, yaklon])

  useEffect(()=>{
    fetchSets()
  }, [fetchSets, selectSeries])

  useEffect(()=>{
    fetchState()
  }, [fetchState])

  useEffect(()=>{
    setSelectSetID(sets[0])
  }, [setSelectSetID, sets])

  return {
    selectSetID,
    setSelectSetID,
    fetchState,
    selectSeries,
    setSelectSeries,
    sets,
    fetchSets,
    baseURI,
    totalSupply,
    nextDnaID,
    nextSetID,
    currentSeries,
  }
}