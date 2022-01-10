import { SupportedChainId } from "./chains"
import { YAKYAK_REWARDS_ADDRESS } from "./addresses"
import { Token } from "@uniswap/sdk-core"

export const YAKYAK: { [chainId: number]: Token } = {
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    YAKYAK_REWARDS_ADDRESS[4],
    18,
    "YKR",
    "YakYak Rewards"
  ),
}
