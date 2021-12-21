import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const YAKYAK_REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0xC9F51064022A011152B7dA6dDE44def02b5C157C",
}

export const YAKYAK_BANK_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x06F7E2F642Cb27A39F30d7522CfE8c04f7D6FeCD",
}
