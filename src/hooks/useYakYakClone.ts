import {useCallback, useEffect, useState} from "react";
import {useYakYakCloneContract} from "./useContract";
import {parseToBigNumber} from "../utils/bignumberUtil";

export const useYakYakClone = () => {
  const [totalSupply, setTotalSupply] = useState('')
  const [nextDnaID, setNextDnaID] = useState('')
  const [nextPeriodID, setNextPeriodID] = useState('')
  const [currentSeries, setCurrentSeries] = useState('')
  const yaklone = useYakYakCloneContract()

  const fetch = useCallback(async ()=> {
    if (!yaklone) return
    setTotalSupply(parseToBigNumber(await yaklone.totalSupply()).toString())
    setNextDnaID(parseToBigNumber(await yaklone.getNextDnaID()).toString())
    setNextPeriodID(parseToBigNumber(await yaklone.getNextPeriodID()).toString())
    setCurrentSeries(parseToBigNumber(await yaklone.getCurrentSeries()).toString())
  }, [yaklone])

  useEffect(()=>{
    fetch()
  }, [fetch])

  setInterval(fetch, 14000)

  return {
    totalSupply,
    nextDnaID,
    nextPeriodID,
    currentSeries,
  }
}