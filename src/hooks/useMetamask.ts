import {Token} from "@uniswap/sdk-core";
import {useState} from "react";
import {ERROR, IDLE, IDLE_DELAY, PROCESSING, SUCCESS} from "../constants/misc";

export const useMetamask = () => {
  const {ethereum} = window
  const [watchAssetsStatus, setWatchAssetsStatus] = useState(IDLE)

  const watchAssets = async (token: Token) => {
    if (!ethereum || !ethereum.on) {
      return
    }
    try {
      setWatchAssetsStatus(PROCESSING)
      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
          },
        },
      })
      setWatchAssetsStatus(SUCCESS)
      setTimeout(() => {
        setWatchAssetsStatus(IDLE)
      }, IDLE_DELAY)
    } catch (e) {
      setWatchAssetsStatus(ERROR)
      setTimeout(() => {
        setWatchAssetsStatus(IDLE)
      }, IDLE_DELAY)
    }
  }

  return {
    watchAssets,
    watchAssetsStatus,
  }
}