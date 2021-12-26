import {Token} from "@uniswap/sdk-core";

export const useMetamask = () => {
  const {ethereum} = window

  const watchAssets = async (token: Token) => {
    if (!ethereum || !ethereum.on) {
      return
    }
    try {
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
    } catch (e) {
      console.log(e)
    }
  }

  return {
    watchAssets,
  }
}