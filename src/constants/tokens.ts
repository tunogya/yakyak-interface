import {Token} from "../api/token";
import {SupportedChainId} from "./chains";
import {
  YAKYAK_REWARDS_ADDRESS,
} from "./addresses";

export const YAKYAK: { [chainId: number]: Token } = {
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, YAKYAK_REWARDS_ADDRESS[4], 18, "YakYak® Rewards", "YakYak®"),
}