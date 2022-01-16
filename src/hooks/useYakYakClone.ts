import {useCallback, useEffect, useState} from "react";
import {useYakYakCloneContract} from "./useContract";
import {parseToBigNumber} from "../utils/bignumberUtil";

export const useYakYakClone = () => {
  const [totalSupply, setTotalSupply] = useState(0)
  const [nextDnaID, setNextDnaID] = useState(0)
  const [nextSetID, setNextSetID] = useState(0)
  const [currentSeries, setCurrentSeries] = useState(0)
  const [baseURI, setBaseURI] = useState('')
  const yaklone = useYakYakCloneContract()

  const fetch = useCallback(async ()=> {
    if (!yaklone) return
    setCurrentSeries(parseToBigNumber((await yaklone.getState()).currentSeries).toNumber())
    setNextSetID(parseToBigNumber((await yaklone.getState()).nextSetID).toNumber())
    setNextDnaID(parseToBigNumber((await yaklone.getState()).nextDnaID).toNumber())
    setTotalSupply(parseToBigNumber(await yaklone.totalSupply()).toNumber())
    setBaseURI(await yaklone.getBaseURI())
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