import {useCallback, useEffect, useState} from "react";
import {useYakYakCloneContract} from "./useContract";
import {formatNumber, parseToBigNumber} from "../utils/bignumberUtil";

export const useYakYakClone = () => {
  const [totalSupply, setTotalSupply] = useState('')
  const [nextDnaID, setNextDnaID] = useState('')
  const [nextSetID, setNextSetID] = useState('')
  const [currentSeries, setCurrentSeries] = useState('')
  const [baseURI, setBaseURI] = useState('')
  const yaklone = useYakYakCloneContract()

  const fetch = useCallback(async ()=> {
    if (!yaklone) return
    setCurrentSeries(formatNumber(parseToBigNumber((await yaklone.getState()).currentSeries)))
    setNextSetID(formatNumber(parseToBigNumber((await yaklone.getState()).nextSetID)))
    setNextDnaID(formatNumber(parseToBigNumber((await yaklone.getState()).nextDnaID)))
    setTotalSupply(formatNumber(parseToBigNumber(await yaklone.totalSupply())))
    setBaseURI(formatNumber(parseToBigNumber(await yaklone.getBaseURI())))
  }, [yaklone])

  useEffect(()=>{
    fetch()
  }, [fetch])

  setInterval(fetch, 14000)

  return {
    baseURI,
    totalSupply,
    nextDnaID,
    nextSetID,
    currentSeries,
  }
}