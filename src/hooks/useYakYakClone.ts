import {useCallback, useEffect, useState} from "react";
import {useYakYakCloneContract} from "./useContract";
import {parseToBigNumber} from "../utils/bignumberUtil";

export const useYakYakClone = () => {
  const [totalSupply, setTotalSupply] = useState('')
  const [nextDNAID, setNextDNAID] = useState('')
  const [nextSetID, setNextSetID] = useState('')
  const [currentSeries, setCurrentSeries] = useState('')
  const yaklone = useYakYakCloneContract()

  const fetch = useCallback(async ()=> {
    if (!yaklone) return
    setTotalSupply(parseToBigNumber(await yaklone.totalSupply()).toString())
    setNextDNAID(parseToBigNumber(await yaklone.getNextDNAID()).toString())
    setNextSetID(parseToBigNumber(await yaklone.getNextSetID()).toString())
    setCurrentSeries(parseToBigNumber(await yaklone.getCurrentSeries()).toString())
  }, [yaklone])

  useEffect(()=>{
    fetch()
  }, [fetch])

  return {
    totalSupply,
    nextDNAID,
    nextSetID,
    currentSeries,
  }
}